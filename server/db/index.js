const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/krayo", {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("DB connected successfully.");
	})
	.catch((e) => {
		console.error("Mongodb connection error ", e.message);
	});

const db = mongoose.connection;

module.exports = db;
