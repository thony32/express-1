// reportController.js
const Reports = require("../models/reportModel")

// Create a report
Reports.createReport = function (req, res) {
  let newReport = new Reports(req.body)
  // handles null error
  if (!newReport.subject || !newReport.description) {
    res.status(400).send({ error: true, message: "Please provide subject/description" })
  } else {
    Reports.createReport(newReport, function (err, report) {
      if (err) res.send(err)
      res.json(report)
  })
  }
}

// Get a single report by id
Reports.getReport = function (req, res) {
  Reports.getReport(req.params.reportId, function (err, report) {
    if (err) res.send(err)
    res.json(report)
  })
}

// Get all reports

Reports.getAllReports = function (req, res) {
  Reports.getAllReports(function (err, reports) {
    if (err) res.send(err)
    console.log("res", reports)
    res.send(reports)
  })
}
// module.exports = {
//   createReport,
//   getAllReports,
//   getReport,
//   deleteReport,
// }
