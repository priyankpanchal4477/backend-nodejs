let mysql = require("mysql");

const connectDatabase = async (req, res) => {
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
      res.json({
        status: false,
        message: "There was an error connecting to database",
      });
    } else {
      console.log("DB Connected to the MySQL server.");
      res.json({ status: true, message: "Database connection successful" });
    }
  });
};

module.exports = { connectDatabase };
