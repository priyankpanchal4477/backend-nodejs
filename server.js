require('dotenv').config();

const db = require("./config/dbConnection");
var express = require("express");
var app = express();

app.use(express.json());

const Router = require("./routes/routes");


app.use(Router);

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port ${process.env.PORT}`);
});

