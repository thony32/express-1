const mongoose = require("mongoose")
require("dotenv").config()

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const dbURL = process.env.MONGO_URL || "mongodb://localhost:27017/mern-auth"

mongoose
    .connect(dbURL, connectionOptions)
    .catch((err) => console.error("MongoDB connection error:", err))

mongoose.Promise = global.Promise

module.exports = {
  User: require("../models/user.model"),
}
