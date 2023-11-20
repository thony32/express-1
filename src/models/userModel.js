const db = require("../utils/databaseConnection")

const createUser = async (userData) => {
  const { username, email, fullName, password , role } = userData
  const sql = `INSERT INTO users (username, email, fullName, password , role) VALUES (?, ?, ?, ?)`
  await db.execute(sql, [username, email, fullName, password , role])
}

const updateUser = async (userId, updateData) => {
  const { username, email, fullName, password } = updateData
  const sql = `UPDATE users SET username = ?, email = ?, fullName = ?, password = ? WHERE id = ?`
  await db.execute(sql, [username, email, fullName, password, userId])
}

const deleteUser = async (userId) => {
  const sql = `DELETE FROM users WHERE id = ?`
  await db.execute(sql, [userId])
}

const getUser = async (userId) => {
  const sql = `SELECT * FROM users WHERE id = ?`
  const [rows] = await db.execute(sql, [userId])
  return rows[0]
}

const getAllUsers = async () => {
  const sql = `SELECT * FROM users`
  const [rows] = await db.execute(sql)
  return rows
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
}
