const db = require("../utils/databaseConnection")

const createReport = async (reportData) => {
  const { subject, description, reportedBy, reportDate, status } = reportData
  const sql = `INSERT INTO reports (subject, description, reportedBy, reportDate, status) VALUES (?, ?, ?, ?, ?)`
  await db.execute(sql, [subject, description, reportedBy, reportDate, status])
}

const getAllReports = async () => {
  const sql = `SELECT * FROM reports`
  const [rows] = await db.execute(sql)
  return rows
}

const getReport = async (reportId) => {
  const sql = `SELECT * FROM reports WHERE id = ?`
  const [rows] = await db.execute(sql, [reportId])
  return rows[0]
}

const deleteReport = async (reportId) => {
  const sql = `DELETE FROM reports WHERE id = ?`
  await db.execute(sql, [reportId])
}

module.exports = {
  createReport,
  getAllReports,
  getReport,
  deleteReport,
}
