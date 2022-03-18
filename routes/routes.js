var express = require("express");
var app = express();

app.use(express.json());

const databaseController = require("../controller/databaseController");

app.get("/connect", databaseController.connectDatabase);

module.exports = app;
