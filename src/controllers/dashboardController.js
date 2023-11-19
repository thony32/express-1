const User = require('../models/userModel');
const Report = require('../models/reportModel');
const Application = require('../models/applicationModel');

const getDashboardStats = async (req, res) => {
  try {
    // Récupérer des statistiques, par exemple, le nombre d'utilisateurs et de rapports
    const userCount = await User.countDocuments();
    const reportCount = await Report.countDocuments();

    res.status(200).json({ userCount, reportCount });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques." });
  }
};

const manageUsers = async (req, res) => {
  try {
    // TODO: Logique pour gérer les utilisateurs (liste, modification, suppression)
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la gestion des utilisateurs." });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const { adminId, updateData } = req.body; // Id de l'admin et les données à mettre à jour

    // Mise à jour du profil de l'administrateur
    const updatedAdmin = await User.findByIdAndUpdate(adminId, updateData, { new: true });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil." });
  }
};

module.exports = { getDashboardStats, manageUsers, updateAdminProfile };
