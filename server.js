require('dotenv').config();

var express = require("express");
var app = express();

app.use(express.json());

const Router = require("./routes/routes");

app.use(Router);


// app.post("/", function (req, res) {
//   console.log(req.body); // your JSON
//   response.send(req.body); // echo the result back
// });

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port ${process.env.PORT}`);
});

