const express = require("express"),
  userController = require("../controllers/userController"),
  router = express.Router()

router.post("/register", userController.register)
router.post("/authenticate", userController.authenticate)

module.exports = router
