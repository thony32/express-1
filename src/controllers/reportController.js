const Reports = require("../models/reportModel")

// const createReport = async (req, res) => {
//   const { subject, description, reportedBy, reportDate, status } = req.body

//   try {
//     await reportModel.createReport({ subject, description, reportedBy, reportDate, status })
//     res.status(201).json({ message: "Rapport créé avec succès" })
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la création du rapport" })
//   }
// }

// const getAllReports = async (req, res) => {
//   try {
//     const reports = await reportModel.getAllReports()
//     res.status(200).json(reports)
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la récupération des rapports" })
//   }
// }

// const getReport = async (req, res) => {
//   const reportId = req.params.id

//   try {
//     const report = await reportModel.getReport(reportId)
//     if (!report) {
//       return res.status(404).json({ message: "Rapport non trouvé" })
//     }
//     res.status(200).json(report)
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la récupération du rapport" })
//   }
// }

// const deleteReport = async (req, res) => {
//   const reportId = req.params.id

//   try {
//     await reportModel.deleteReport(reportId)
//     res.status(200).json({ message: "Rapport supprimé avec succès" })
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la suppression du rapport" })
//   }
// }

exports.getAllReports = function (req, res) {
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
