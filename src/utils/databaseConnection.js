'use strict';
const mysql = require('mysql2');
//local mysql db connection
const databaseConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proref-db'
});
databaseConnection.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = databaseConnection;
