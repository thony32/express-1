const express = require("express")
const router = express.Router()

const reportController = require("../controllers/reportController")
const userController = require("../controllers/userController")

// Routes pour les rapports
router.post("/reports", reportController.createReport)
router.get("/reports", reportController.getAllReports)
router.get("/reports/:reportId", reportController.getReport)

// Routes pour les utilisateurs
router.post("/users", userController.createUser)
router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/users/:userId", userController.getUser)
router.get("/users", userController.getAllUsers)
router.put("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.deleteUser)

module.exports = router