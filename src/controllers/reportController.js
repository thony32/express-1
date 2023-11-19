const Report = require("../models/reportModel")

// Créer un nouveau rapport
const createReport = async (req, res) => {
  try {
    const { subject, description, reportedBy } = req.body
    const newReport = new Report({ subject, description, reportedBy })

    const savedReport = await newReport.save()
    res.status(201).json(savedReport)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtenir tous les rapports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtenir un rapport spécifique par son ID
const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId)
    if (!report) {
      res.status(404).json({ message: "Rapport non trouvé." })
      return
    }
    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Mettre à jour un rapport
const updateReport = async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.reportId, req.body, { new: true })
    res.json(updatedReport)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Supprimer un rapport
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.reportId)
    if (!report) {
      res.status(404).json({ message: "Rapport non trouvé." })
      return
    }
    res.json({ message: "Rapport supprimé avec succès." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createReport, getAllReports, getReport, updateReport, deleteReport }
