const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
// * Handle user NORMAL sign up
const signup = async (req, res) => {
  try {
    const { username, email, full_name, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      full_name,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// * Handle user NORMAL Login 
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// TODO: Handle Google Authentication



module.exports = {
  signup,
  login,
};
