const express = require("express")
const router = express.Router()

// const reportController = require("../controllers/reportController")
const userController = require("../controllers/userController")

// Routes pour les rapports
// router.post("/reports", reportController.createReport)
// router.get("/reports", reportController.getAllReports)
// router.get("/reports/:reportId", reportController.getReport)
// router.delete("/reports/:reportId", reportController.deleteReport)

// Routes pour les utilisateurs
// router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
// router.get("/users/:userId", userController.getUser)
// router.put("/users/:userId", userController.updateUser)
// router.delete("/users/:userId", userController.deleteUser)

module.exports = router
