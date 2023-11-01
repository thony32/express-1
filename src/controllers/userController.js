const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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


module.exports = {
  register,
  authenticate,
}
