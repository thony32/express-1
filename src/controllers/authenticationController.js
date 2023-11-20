const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
// const sendEmail = require('../utils/emailSender');
// const { generateToken, verifyToken } = require('../utils/tokenHandler');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Vérifier si l'utilisateur existe déjà
    const userExists = await userModel.findUserByEmail(email)
    if (userExists) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." })
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Création du nouvel utilisateur
    await userModel.createUser({ username, email, fullName: username, password: hashedPassword })

    res.status(201).json({ message: "Inscription réussie!" })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription." })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérification de l'existence de l'utilisateur
    const user = await userModel.findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." })
    }

    // Vérification du mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect." })
    }

    // Création du token JWT
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.status(200).json({ result: user, token })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion." })
  }
}

// const forgotPassword = async (req, res) => {
//   // ... Logique pour oubli de mot de passe
// };

// const resetPassword = async (req, res) => {
//   // ... Logique pour réinitialisation de mot de passe
// };

module.exports = { register, login }
