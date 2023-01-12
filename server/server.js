const express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./db");
db.on("error", console.error.bind(console, "Mongodb connection error"));

db.on;
app.use(cors());
app.use(fileUpload());

global.__basedir = __dirname;
// Route files
var apiRouter = require("./platform/routes");
// Mounting routes
app.use("/", apiRouter);
process.on("unhandledRejection", (err) => {
	console.log("Error : ", err);
	app.close(() => process.exit(1));
});
app.listen(5000, () => console.log("Server Started..."));
