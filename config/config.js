var mongoose = require("mongoose")

const mongodbUri = "mongodb://127.0.0.1:27017/vumonic";


mongoose.connect(mongodbUri);

module.exports = {
	mongoose: mongoose,
	Schema: mongoose.Schema,
	secretKey: "vumonic#123vumonic"
};
