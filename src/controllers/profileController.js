const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

const getUserProfile = async (req, res) => {
  try {
    // L'ID de l'utilisateur est normalement récupéré via la session ou le token JWT
    const userId = req.userId

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." })
    }

    // Ne pas envoyer le mot de passe
    const { password, ...otherDetails } = user._doc

    res.status(200).json(otherDetails)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du profil." })
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { username, email, password } = req.body

    // Pour la mise à jour du mot de passe, assurez-vous de le hasher
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined

    const updateData = {
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

    // Ne pas envoyer le mot de passe mis à jour
    const { password: _, ...updatedDetails } = updatedUser._doc

    res.status(200).json(updatedDetails)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil." })
  }
}

module.exports = { getUserProfile, updateUserProfile }
