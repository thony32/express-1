const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

const dashboardController = require("../controllers/dashboardController")
const { protect, authorize } = require("../middleware/authMiddleware")

// Route pour obtenir des statistiques du tableau de bord
router.get("/stats", protect, authorize("admin"), dashboardController.getDashboardStats)

// Route pour gérer les utilisateurs (liste, modification, suppression)
router.get("/users", protect, authorize("admin"), dashboardController.manageUsers)
router.put("/users/:userId", protect, authorize("admin"), userController.updateUser)
router.delete("/users/:userId", protect, authorize("admin"), userController.deleteUser)

// Route pour mettre à jour le profil de l'administrateur
router.put("/profile", protect, authorize("admin"), dashboardController.updateAdminProfile)

module.exports = router
