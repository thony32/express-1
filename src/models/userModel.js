"use strict"
const db = require("../utils/databaseConnection")

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

// const createUser = async (userData) => {
//   const { username, email, fullName, password, role } = userData
//   const sql = `INSERT INTO users (username, email, fullName, password , role) VALUES (?, ?, ?, ? , ?)`
//   await db.execute(sql, [username, email, fullName, password, role])
// }

// const updateUser = async (userId, updateData) => {
//   const { username, email, fullName, password } = updateData
//   const sql = `UPDATE users SET username = ?, email = ?, fullName = ?, password = ? WHERE id = ?`
//   await db.execute(sql, [username, email, fullName, password, userId])
// }

// const deleteUser = async (userId) => {
//   const sql = `DELETE FROM users WHERE id = ?`
//   await db.execute(sql, [userId])
// }

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
