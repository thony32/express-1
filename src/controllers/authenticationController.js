const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

// TODO: Mot de passe oublié
// TODO: Récupération mot de passe
// TODO: Vérification email

module.exports = { register, login }
