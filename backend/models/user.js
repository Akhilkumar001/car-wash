const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	phone: {
		type: Number,
		required: true,
	},
	vehicle: [
		{   
			vehicleNumber: { type: String, required: true },
			vehicleModel: { type: String, required: true },
			vehicleSize: { type: String, required: true },
		},
	],
	address: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", UserSchema);
