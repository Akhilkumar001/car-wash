const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Admin = require("../models/admin");
const Center = require("../models/carCenters");
const Services = require("../models/services");
const Booking = require("../models/bookings");

const verifyToken = async (req, res, next) => {
	const token = req.cookies["token"];
	if (token === undefined) {
		res.send("Unauthorized access");
	}
	await jwt.verify(token, process.env.SecretKey1, (err, decoded) => {
		if (err) {
			return res.send({ message: "Unauthorized Access" });
		} else {
			next();
		}
	});
};
//Admin Use case:
//route("/register") to register Admin member

router.post("/register", async (req, res) => {
	const { username: userName, password: password1, email, phone } = req.body;
	console.log(userName);
	console.log(password1);
	const userDB = await Admin.findOne({ userName: userName });

	if (userDB) {
		res.send("Username already exists");
	} else {
		const password = await bcrypt.hash(password1, 6);
		//console.log(typeof(password))
		const newAdmin = new Admin({ userName, password, email, phone });
		newAdmin.save((err) => {
			if (err) {
				res.send("Error occured while entering data into database :( \n" + err);
			} else {
				res.send("Admin Created Successfully :)");
			}
		});
	}
});

//Admin Use case:
//route("/login") to  login and Authenticate Admin

router.post("/login", async (req, res) => {
	const { username: userName, password } = req.body;
	console.log(userName, password);
	const userDB = await Admin.findOne({ userName: userName });
	if (userDB) {
		let result = await bcrypt.compare(password, userDB.password);
		if (!result) {
			res.send("Invalid Credentials!!!");
		} else {
			const signedToken = await jwt.sign(
				{ userName: userName },
				process.env.SecretKey1
			);
			//console.log(signedToken)
			res.cookie("token", signedToken);
			res.status(200).send();
		}
	} else {
		res.status(404).send();
	}
});

//Admin Use case:
//route("/addCarCenter") to  Add Places

router.post("/addCarCenter", verifyToken, (req, res) => {
	const { name, location, email, phone, services } = req.body;

	const newCenter = new Center({ name, location, email, phone, services });

	newCenter.save((err) => {
		if (err) {
			res.send("Error while adding new car center :( \n" + err);
		} else {
			res.send("New Center Added Successfully :)");
		}
	});
});

//Admin Use case:
//route("/addServices") to  Add Services

router.post("/addServices", verifyToken, (req, res) => {
	const { id, name, description, vehicle, price } = req.body;
	const cost = [vehicle, price];
	console.log(description);
	const newService = new Services({ id, name, description, costs });

	newService.save((err) => {
		if (err) {
			res.send("Error while adding new car center :( \n" + err);
		} else {
			res.send("New Service Added Successfully :)");
		}
	});
});
//Admin Use case:

const findBookings = async () => {
	const bookings = await Booking.find({});
	const centers = await Center.find({});

	let arr = JSON.parse(JSON.stringify(bookings));

	for (let i = 0; i < arr.length; i++) {
		for (b of centers) {
			if (arr[i].carCenter == b._id) {
				arr[i].carCenterName = b.name;
				arr[i].phone = b.phone;
			}
		}
	}
	//console.log(arr)
	return arr;
};

router.get("/viewBookings", async (req, res) => {
	const bookings = await findBookings();
	res.send(bookings);
});

//route("/viewBookings/:options") to  ViewAllBookings,filter based on -
//options : place:date
router.get("/viewBookings/:options", async (req, res) => {
	const options = req.params.options;
	const [place, date] = options.split(":");

	const centers = await Center.find(
		{ location: place },
		{ __v: 0, location: 0, email: 0, services: 0 }
	);
	const a = centers.map((x) => String(x._id));
	console.log(a);
	//console.log(centers)

	const bookings = await Booking.find({
		$and: [{ carCenter: { $in: a } }, { "slot.date": date }],
	});

	let arr = JSON.parse(JSON.stringify(bookings));

	for (let i = 0; i < arr.length; i++) {
		for (b of centers) {
			if (arr[i].carCenter == b._id) {
				arr[i].carCenterName = b.name;
				arr[i].phone = b.phone;
			}
		}
	}
	console.log(arr);
	res.send(arr);
});

//Admin Use case:
//route("/viewBookings/updateStatus") to Accept/Reject Booking

router.post("/viewBookings/updateStatus", async (req, res) => {
	const { _id, status } = req.body;
	const updated = await Booking.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(_id) },
		{ $set: { status: status } }
	);

	if (status == "Accepted") {
		const rejectUsers = await Booking.updateMany(
			{ $and: [{ slot: updated.slot }, { status: "Pending" }] },
			{ $set: { status: "Rejected" } }
		);
	}
	const bookings = await findBookings();
	res.send(bookings);
});

module.exports = router;
