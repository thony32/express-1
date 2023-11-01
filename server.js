const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./src/routes/routes")
const cors = require("cors")
require('dotenv').config()

const app = express()
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000
const dbURL = process.env.MONGO_URL || "mongodb://localhost:27017/mern-auth"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => console.error("MongoDB connection error:", err))

app.use(cors())
app.use("/api", routes)
