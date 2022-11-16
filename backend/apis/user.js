const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Center = require("../models/carCenters");
const Services = require("../models/services");
const Booking = require("../models/bookings");
const bookings = require("../models/bookings");

const verifyToken = async (req, res, next) => {
	const token = req.cookies["token"];
	if (token === undefined) {
		res.send("Unauthorized access");
	}
	await jwt.verify(token, process.env.SecretKey2, (err, decoded) => {
		if (err) {
			return res.send({ message: "Unauthorized Access" });
		} else {
			next();
		}
	});
};

//USer Use case:
//route("/register") to register newUser
router.post("/register", async (req, res) => {
	const {
		userName,
		password: password1,
		email,
		phone,
		vehicle,
		address,
	} = req.body;

	const userDB = await User.findOne({ userName: userName });

	if (userDB) {
		res.send("Username already exists");
	} else {
		const password = await bcrypt.hash(password1, 6);
		const newUser = new User({
			userName,
			password,
			email,
			phone,
			vehicle,
			address,
		});
		newUser.save((err) => {
			if (err) {
				res.send("Error occured while entering data into database :( \n" + err);
			} else {
				res.send("User Created Successfully :)");
			}
		});
	}
});

//USer Use case:
//route("/login") To login  and Authenticate User

router.post("/login", async (req, res) => {
	const { userName, password } = req.body;
	const userDB = await User.findOne({ userName: userName });
	if (userDB) {
		let result = await bcrypt.compare(password, userDB.password);
		if (!result) {
			res.send("Invalid Credentials!!!");
		} else {
			const signedToken = await jwt.sign({ userName }, process.env.SecretKey2);
			res
				.cookie("token", signedToken)
				.cookie("userName", userName)
				.send("LoggedIn Successfully :)");
		}
	} else {
		res.send("Invalid Credentials!!!!");
	}
});

//USer Use case:
//route("/:userName/carCenters/statuses") to get the Booking status

router.get("/:userName/carCenters/statuses", async (req, res) => {
	const userName = req.params.userName;

	const userBookings = await bookings.find(
		{ userName: userName },
		{ _id: 0, __v: 0 }
	);

	res.send(userBookings);
});

//USer Use case:
//route("/:userName/carCenters/:place") to Search Based on Place

router.get("/:userName/carCenters/:place", async (req, res) => {
	const place = req.params.place;

	let centers = JSON.parse(
		JSON.stringify(await Center.find({ location: place }, { _id: 0, __v: 0 }))
	);
	let services = await Services.find({}, { _id: 0, __v: 0 });

	for (let i = 0; i < centers.length; i++) {
		let x = centers[i].services;
		for (let j = 0; j < x.length; j++) {
			for (let k = 0; k < 4; k++) {
				if (x[j] == services[k].id) {
					centers[i].services[j] = services[k];
				}
			}
		}
	}

	res.send({ centers: centers });
});

//USer Use case:
//route("/:userName/carCenters/booking") for Booking slot for Car wash from car center

router.post("/:userName/carCenters/booking", async (req, res) => {
	const { carCenter, date, timeSlot, serviceOpted } = req.body;
	const db = await Booking.findOne({
		$and: [
			{ "slot.date": date },
			{ "slot.timeSlot": timeSlot },
			{ status: "Success" },
		],
	});
	//console.log(db)
	if (db) {
		res.send("Slot already booked");
	} else {
		const newBooking = new Booking({
			userName: req.params.userName,
			carCenter: carCenter,
			slot: { date: date, timeSlot: timeSlot },
			serviceOpted: serviceOpted,
			status: 0,
		});
		newBooking.save((err) => {
			if (err) {
				res.send("Error in booking :(\n" + err);
			} else {
				res.send("Slot Booked Successfully :)");
			}
		});
	}
});

//USer Use case:
//route("/:userName/logout") to Logout User

router.get("/:userName/logout", async (req, res) => {
	res.clearCookie("token");
});
module.exports = router;
