const express = require("express")
const router = express.Router()

const dashboardController = require("../controllers/dashboardController")
const reportController = require("../controllers/reportController")
const userController = require("../controllers/userController")
const { register, login } = require("../controllers/authenticationController")

// Routes pour les rapports
router.post("/reports", reportController.createReport)
router.get("/reports", reportController.getAllReports)
router.get("/reports/:reportId", reportController.getReport)
router.delete("/reports/:reportId", reportController.deleteReport)

// Routes pour les utilisateurs
router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
router.get("/users/:userId", userController.getUser)
router.put("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.deleteUser)

// Route pour l'inscription
router.post("/register", register)

// Route pour la connexion
router.post("/login", login)

// Route pour mettre à jour le profil de l'administrateur
router.put("/profile", dashboardController.updateAdminProfile)
// Route pour obtenir des statistiques du tableau de bord
router.get("/stats", dashboardController.getDashboardStats)

module.exports = router
