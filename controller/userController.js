const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { connection } = require("../config/dbConnection");

var md5 = require("md5");

const createUser = async (req, res) => {
  // const users = await prisma.users.findMany();

  try {
    let { firstName, lastName, email, password } = req.body;
    password = md5(password);
    req.body.password = password;

    
    // Using MySQL
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, rows, fields) => {
        if (rows.length > 0) {
          res.json({
            status: false,
            data: rows,
            message: "User already registered",
          });
        } else {
          let query = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?);`;
          connection.query(
            query,
            [firstName, lastName, email, password],
            (err, rows, fields) => {
              res.json({ data: rows });
            }
          );
        }
      }
    );

    
    // Using Prisma
    // const user = await prisma.users.create({
    //   data: req.body,
    // });

    // res.json({ data: user });
  } catch (err) {
    res.json({
      Error: {
        code: err.code,
        Message: err.message,
      },
    });
  }
};

module.exports = { createUser };
