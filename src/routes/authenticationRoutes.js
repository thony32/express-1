const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

// Route pour l'inscription
router.post('/register', authController.register);

// Route pour la connexion
router.post('/login', authController.login);

// TODO: Routes supplémentaires pour l'authentification
// Par exemple, pour la réinitialisation du mot de passe, la vérification de l'email, etc.
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post('/verify-email', authController.verifyEmail);

module.exports = router;
