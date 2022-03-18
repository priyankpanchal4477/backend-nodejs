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

const getUser = async (req, res) => {
  try {
    const { email } = req.params;

    // Using MySQL
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, rows, fields) => {
        if (rows.length > 0) {
          res.json({
            data: rows,
          });
        } else {
          res.json({
            data: [],
          });
        }
      }
    );

    // Using Prisma
    // const user = await prisma.users.findUnique({
    //   where: {
    //     email: email,
    //   },
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

const updateUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    password = md5(password);
    req.body.password = password;

    // Using MySQL

    let selectQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(selectQuery, [req.params.email], (err, rows, fields) => {
      if (rows.length > 0) {
        const update_query =
          "UPDATE users set firstName =? , lastName =?, email=?, password=?  WHERE email=?";
        connection.query(
          update_query,
          [firstName, lastName, email, password, req.params.email],
          (err, rows, fields) => {
            if (rows?.affectedRows > 0) {
              connection.query(selectQuery, [email], (err, rows, fields) => {
                res.json({
                  data: rows,
                });
              });
            }
          }
        );
      } else {
        res.json({
          status: false,
          message: "User not exists",
        });
      }
    });

    // Using Prisma
    // const user = await prisma.users.update({
    //   where: {
    //     email: req.params.email,
    //   },
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

module.exports = { createUser, getUser, updateUser };
