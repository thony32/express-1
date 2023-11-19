const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require('../controllers/authenticationController');

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour la demande de réinitialisation de mot de passe
router.post('/forgot-password', forgotPassword);

// Route pour la réinitialisation de mot de passe
router.post('/reset-password/:token', resetPassword);

module.exports = router;


// Par exemple, pour la réinitialisation du mot de passe, la vérification de l'email, etc.
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post('/verify-email', authController.verifyEmail);