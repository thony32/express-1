// const bcrypt = require("bcryptjs")
const Users = require("../models/userModel")

// const createUser = async (req, res) => {
//   const { username, email, fullName, password } = req.body
//   const hashedPassword = await bcrypt.hash(password, 12)

//   try {
//     await userModel.createUser({ username, email, fullName, hashedPassword })
//     res.status(201).json({ message: "Utilisateur créé avec succès" })
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" })
//   }
// }

// const updateUser = async (req, res) => {
//   const userId = req.params.id
//   const { username, email, fullName, password } = req.body
//   const hashedPassword = await bcrypt.hash(password, 12)

//   try {
//     await userModel.updateUser(userId, { username, email, fullName, hashedPassword })
//     res.status(200).json({ message: "Utilisateur mis à jour avec succès" })
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" })
//   }
// }

// const deleteUser = async (req, res) => {
//   const userId = req.params.id

//   try {
//     await userModel.deleteUser(userId)
//     res.status(200).json({ message: "Utilisateur supprimé avec succès" })
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" })
//   }
// }

// const getUser = async (req, res) => {
//   const userId = req.params.id

//   try {
//     const user = await userModel.getUser(userId)
//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" })
//   }
// }

exports.getAllUsers = function (req, res) {
  Users.getAllUsers(function (err, users) {
    if (err) res.send(err)
    console.log("res", users)
    res.send(users)
  })
}

// module.exports = {
//   createUser,
//   updateUser,
//   deleteUser,
//   getUser,
//   getAllUsers,
// }
