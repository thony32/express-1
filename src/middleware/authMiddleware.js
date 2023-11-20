const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extraire le token du header
      token = req.headers.authorization.split(" ")[1]

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Récupérer les informations de l'utilisateur à partir du token
      req.user = await userModel.getUser(decoded.id)

      // Exclure le mot de passe des informations de l'utilisateur
      if (req.user) {
        delete req.user.password
      }

      next()
    } catch (error) {
      res.status(401).json({ message: "Non autorisé, token invalide" })
    }
  }

  if (!token) {
    res.status(401).json({ message: "Non autorisé, pas de token" })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `L'utilisateur n'est pas autorisé pour ce rôle: ${roles}` })
    }
    next()
  }
}

module.exports = { protect, authorize }
