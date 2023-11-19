const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model("Application", applicationSchema)
