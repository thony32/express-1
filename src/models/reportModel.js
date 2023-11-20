const db = require("../utils/databaseConnection")

var Reports = function (reports) {
  this.id = reports.id
  this.subject = reports.subject
  this.description = reports.description
  this.reportedBy = reports.reportedBy
  this.reportDate = reports.reportDate
}

// const createReport = async (reportData) => {
//   const { subject, description, reportedBy, reportDate } = reportData
//   const sql = `INSERT INTO reports (subject, description, reportedBy, reportDate) VALUES (?, ?, ?, ?)`
//   await db.execute(sql, [subject, description, reportedBy, reportDate])
// }

// const getAllReports = async () => {
//   const sql = `SELECT * FROM reports`
//   const [rows] = await db.execute(sql)
//   return rows
// }

// const getReport = async (reportId) => {
//   const sql = `SELECT * FROM reports WHERE id = ?`
//   const [rows] = await db.execute(sql, [reportId])
//   return rows[0]
// }

// const deleteReport = async (reportId) => {
//   const sql = `DELETE FROM reports WHERE id = ?`
//   await db.execute(sql, [reportId])
// }

Reports.getAllReports = function (result) {
  const sql = "SELECT * FROM reports"
  db.query(sql, function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(null, err)
    } else {
      console.log("reports : ", res)
      result(null, res)
    }
  })
}

module.exports = Reports
