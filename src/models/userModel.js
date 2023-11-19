const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  // Hachage du mot de passe avec un sel
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Méthode pour comparer le mot de passe haché avec un mot de passe non haché
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
