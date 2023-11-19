const jwt = require("jsonwebtoken")

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Expire dans 30 jours, par exemple
  })
}

// Vérifier un token JWT
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
// TODO: Vérification email pendant récupération mot de passe

module.exports = { generateToken, verifyToken }
