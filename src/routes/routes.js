const express = require('express'), authController = require('../controllers/authController'),
router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
