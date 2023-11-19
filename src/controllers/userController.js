const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Création d'un nouvel utilisateur (par un administrateur, par exemple)
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

// Mise à jour d'un utilisateur
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const updateData = {
      username,
      email,
      ...(password && { password: await bcrypt.hash(password, 12) }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
  }
};

// Consultation d'un utilisateur
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// Listage de tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
