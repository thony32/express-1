const express = require("express"),
  userController = require("../controllers/userController"),
  router = express.Router()

router.post("/register", userController.register)
router.post("/authenticate", userController.authenticate)
router.get("/users", userController.getAll) // Get all users
router.get("/users/:id", userController.getById) // Get user by ID
router.post("/users", userController.create) // Create a new user
router.put("/users/:id", userController.update) // Update a user
router.delete("/users/:id", userController.delete)

module.exports = router
