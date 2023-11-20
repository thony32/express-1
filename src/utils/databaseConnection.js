require("dotenv").config()
"use strict"
const mysql = require("mysql2")
//local mysql db connection
const databaseConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
})
databaseConnection.connect(function (err) {
  if (err) throw err
  console.log("Database Connected!")
})
module.exports = databaseConnection
