const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Open", "In Review", "Resolved", "Closed"],
    default: "Open",
  },
})

module.exports = mongoose.model("Report", reportSchema)
