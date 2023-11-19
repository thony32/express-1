const mongoose = require("mongoose")

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/proref-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1) // Arrêt du processus en cas d'échec de connexion
  }
}

module.exports = databaseConnection
