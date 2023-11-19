const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require('../utils/emailSender')
const { generateToken, verifyToken } = require('../utils/tokenHandler')

const register = async (req, res) => {
  try {
    // Extraction des données de l'utilisateur depuis le corps de la requête
    const { username, email, password } = req.body

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." })
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Création du nouvel utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })

    // Enregistrement de l'utilisateur dans la base de données
    await user.save()

    // Réponse
    res.status(201).json({ message: "Inscription réussie!" })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription." })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." })
    }

    // Vérification du mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect." })
    }

    // Création du token JWT
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    // Réponse avec le token
    res.status(200).json({ result: user, token })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion." })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email." });
    }

    // Générer un token pour réinitialisation de mot de passe
    const resetToken = generateToken(user._id);

    const resetUrl = `http://votre-front-end/reset-password/${resetToken}`;
    const message = `Vous recevez cet email car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe pour votre compte. Veuillez faire une requête POST avec votre nouveau mot de passe et la confirmation du mot de passe à: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Réinitialisation du Mot de Passe',
        text: message,
      });

      res.status(200).json({ message: "Email envoyé." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur d'envoi d'email." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la demande de réinitialisation du mot de passe." });
  }
};

// Récupération mot de passe
const resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const decoded = verifyToken(resetToken);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Token invalide ou expiré." });
    }

    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur de réinitialisation du mot de passe." });
  }
};


module.exports = { register, login, forgotPassword, resetPassword }
