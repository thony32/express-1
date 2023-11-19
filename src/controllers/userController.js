const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secretKey = process.env.SECRET_KEY

// NOTE: Handle user NORMAL Login
const authenticate = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" })

    res.json({ token })
  } catch (error) {
    console.error("Login failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE: Handle user NORMAL sign up
const register = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password, createdDate } = req.body

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      createdDate: Date.now(),
    })

    await newUser.save()

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" })

    res.status(201).json({ token })
  } catch (error) {
    console.error("Signup failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE Get all users
const getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error("Get all users failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE Get user by ID
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error("Get user by ID failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE Create a new user
const create = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password } = req.body
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      createdDate: Date.now(),
    })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error("Create user failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE Update a user
const update = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password } = req.body
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    // Update fields if provided
    user.username = username || user.username
    user.email = email || user.email
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    if (password) {
      user.password = await bcrypt.hash(password, 10)
    }
    await user.save()
    res.json(user)
  } catch (error) {
    console.error("Update user failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// NOTE Delete a user
const _delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user failed:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  register,
  authenticate,
}
