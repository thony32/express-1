const mongoose = require("mongoose")
require("dotenv").config()

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const dbURL = process.env.MONGO_URL || "mongodb://localhost:27017/mern-auth"

// NOTE: Handle MongoDB connection
mongoose
  .connect(dbURL, connectionOptions)
  .then(() => {
    console.log("MongoDB connection successful")
  })
  .catch((err) => console.error("MongoDB connection error:", err))

mongoose.Promise = global.Promise

module.exports = {
  User: require("../models/userModel"),
}
