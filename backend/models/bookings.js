const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
	userName: { type: String, required: true },
	carCenter: { type: mongoose.Types.ObjectId, required: true },
	slot: {
		date: { type: Date, required: true, default: Date.now() },
		timeSlot: { type: Number, required: true },
	},
	serviceOpted: { type: Number, required: true },
	status: { type: String },
});

module.exports = mongoose.model("Booking", BookingSchema);
