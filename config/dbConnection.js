const mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect(function (err) {
  if (err) {
    console.log("DB connection Error", err);
  } else {
    console.log("DB Connected to the MySQL server.");
  }
});

module.exports = { connection };
