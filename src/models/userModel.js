"use strict"
const db = require("../utils/databaseConnection")
const bcrypt = require("bcrypt")
require("dotenv").config()

// * attributs user
var Users = function (users) {
  this.id = users.id
  this.username = users.username
  this.email = users.email
  this.fullName = users.fullName
  this.password = users.password
  this.role = users.role
  this.createdAt = users.createdAt
}

Users.login = function (usernameOrEmail, password, result) {
  const sql = "SELECT * FROM users WHERE username = ? OR email = ?"
  db.query(sql, [usernameOrEmail, usernameOrEmail], function (err, rows) {
    if (err) {
      console.error("Error retrieving user:", err)
      result(err, null)
    } else {
      if (rows.length > 0) {
        const user = rows[0]

        bcrypt.compare(password, user.password, function (err, passwordMatch) {
          if (err) {
            console.error("Error comparing passwords:", err)
            result(err, null)
          } else {
            if (passwordMatch) {
              console.log("Login successful!")
              result(null, user)
            } else {
              console.log("Incorrect password")
              result(null, false)
            }
          }
        })
      } else {
        console.log("User not found")
        result(null, null)
      }
    }
  })
}

Users.createUser = function (newUser, result) {
  bcrypt.hash(newUser.password, 10, function (err, hash) {
    if (err) {
      console.error("Error hashing password:", err)
    } else {
      const sql = "INSERT INTO users (username, email, fullName, password , role) VALUES (?, ?, ?, ?, ?)"
      db.query(sql, [newUser.username, newUser.email, newUser.fullName, hash, newUser.role], function (err, res) {
        if (err) {
          console.log("error: ", err)
          result(err, null)
        } else {
          console.log("new user created: ", res.insertId)
          result(null, res.insertId)
        }
      })
    }
  })
}

// const createUser = async (userData) => {
//   const { username, email, fullName, password, role } = userData
//   const sql = `INSERT INTO users (username, email, fullName, password , role) VALUES (?, ?, ?, ? , ?)`
//   await db.execute(sql, [username, email, fullName, password, role])
// }

Users.updateUser = function (userId, user, result) {
  const sql = "UPDATE users SET username = ?, email = ?, fullName = ?, password = ?, role = ?, createdAt = ? WHERE id = ?"
  db.query(sql, [user.username, user.email, user.fullName, user.password, user.role, user.createdAt, userId], function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(null, err)
    } else {
      console.log("user updated: ", userId)
      result(null, res)
    }
  })
}

// const updateUser = async (userId, updateData) => {
//   const { username, email, fullName, password } = updateData
//   const sql = `UPDATE users SET username = ?, email = ?, fullName = ?, password = ? WHERE id = ?`
//   await db.execute(sql, [username, email, fullName, password, userId])
// }

Users.deleteUser = function (userId, result) {
  const sql = "DELETE FROM users WHERE id = ?"
  db.query(sql, [userId], function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(null, err)
    } else {
      console.log("user deleted: ", userId)
      result(null, res)
    }
  })
}

// const deleteUser = async (userId) => {
//   const sql = `DELETE FROM users WHERE id = ?`
//   await db.execute(sql, [userId])
// }

Users.getUser = function (userId, result) {
  const sql = "SELECT * FROM users WHERE id = ?"
  db.query(sql, [userId], function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(err, null)
    } else {
      console.log("found user: ", res)
      result(null, res)
    }
  })
}

// const getUser = async (userId) => {
//   const sql = `SELECT * FROM users WHERE id = ?`
//   const [rows] = await db.execute(sql, [userId])
//   return rows[0]
// }

Users.getAllUsers = function (result) {
  const sql = "SELECT * FROM users"
  db.query(sql, function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(null, err)
    } else {
      console.log("users : ", res)
      result(null, res)
    }
  })
}

module.exports = Users
