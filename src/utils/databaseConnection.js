const mysql = require("mysql2/promise")

const databaseConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    })

    console.log(`MySQL Connected: ${connection.config.host}`)
    return connection
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1) // Arrêt du processus en cas d'échec de connexion
  }
}

module.exports = databaseConnection
