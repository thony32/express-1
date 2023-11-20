const db = require("../utils/databaseConnection")

const uploadApplication = async (applicationData) => {
  const { version, downloadLink, description } = applicationData
  const releaseDate = new Date() // ou utilisez une date fournie
  const sql = `INSERT INTO applications (version, downloadLink, releaseDate, description) VALUES (?, ?, ?, ?)`
  await db.execute(sql, [version, downloadLink, releaseDate, description])
}

const getApplication = async (applicationId) => {
  const sql = `SELECT * FROM applications WHERE id = ?`
  const [rows] = await db.execute(sql, [applicationId])
  return rows[0]
}

const downloadApplication = async (applicationId) => {
  const sql = `SELECT downloadLink FROM applications WHERE id = ?`
  const [rows] = await db.execute(sql, [applicationId])
  return rows[0]?.downloadLink
}

module.exports = {
  uploadApplication,
  getApplication,
  downloadApplication,
}
