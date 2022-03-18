let express = require("express");
let app = express();

let multer = require("multer");
let upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(upload.array());
app.use(express.static("public"));

const { validate, ValidationError, Joi } = require("express-validation");

const createUserValidation = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

const databaseController = require("../controller/databaseController");

const { createUser } = require("../controller/userController");

app.get("/connect", databaseController.connectDatabase);

app.post("/createUser", validate(createUserValidation), createUser);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

module.exports = app;
