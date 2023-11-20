const userModel = require("../models/userModel")
const reportModel = require("../models/reportModel")
const applicationModel = require("../models/applicationModel")

const getDashboardStats = async (req, res) => {
  try {
    // Récupérer des statistiques, par exemple, le nombre d'utilisateurs, de rapports et d'applications
    const userCount = await userModel.countUsers()
    const reportCount = await reportModel.countReports()
    const applicationCount = await applicationModel.countApplications()

    res.status(200).json({ userCount, reportCount, applicationCount })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques." })
  }
}

const manageUsers = async (req, res) => {
  try {
    // Logique pour gérer les utilisateurs (liste, modification, suppression)
    const users = await userModel.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la gestion des utilisateurs." })
  }
}

const updateAdminProfile = async (req, res) => {
  try {
    const { adminId, updateData } = req.body // Id de l'admin et les données à mettre à jour

    // Mise à jour du profil de l'administrateur
    await userModel.updateUser(adminId, updateData)
    const updatedAdmin = await userModel.getUser(adminId)

    res.status(200).json(updatedAdmin)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil." })
  }
}

module.exports = { getDashboardStats, manageUsers, updateAdminProfile }
