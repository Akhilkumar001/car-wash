import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../App.css";
import Nav from "./Nav";
import ShowTableData from "./ShowTableData";
const ViewBooking = () => {
	const divStyle = {
		marginTop: "180px",
		marginRight: "33%",
		width: "350px",

		marginLeft: "33%",
	};
	const headings = [
		"Car Center Name",
		"Phone",
		"User",
		"Date",
		"Slot",
		"Service",
		"Status",
		" ",
	];
	const [bookings, setBookings] = useState([]);
	const [date, setDate] = useState("");
	const [place, setPlace] = useState("");
	const submitHandler = (event) => {
		event.preventDefault();
		console.log(`/admin/viewBookings/${date}:${place}`);
		axios
			.get(`http://localhost:4000/admin/viewBookings/${place}:${date}`)
			.then((res) => {
				console.log(res.data);
				setBookings(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const viewAllBookings = () => {
		axios
			.get("http://localhost:4000/admin/viewBookings")
			.then((res) => {
				console.log(res.data);
				setBookings(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const submitHandler1 = (id,status) => {
		axios.post('http://localhost:4000/admin/viewBookings/updateStatus',{_id : id, status : status}).then((res)=>{
			setBookings(res.data);
		}).catch((err)=>{
			console.log(err);
		})
	};

	return (
		<div>
			<Nav/>
			<div>
				<button onClick={viewAllBookings}>View All Bookings</button>
			</div>
			<div style={divStyle}>
				<h4>View Bookings based on Selections</h4>
				<Form onSubmit={submitHandler}>
					<Form.Group>
						{/* <Form.Label>Enter your full name:</Form.Label> */}
						<Form.Control
							type="text"
							placeholder="yyyy-mm-dd"
							onChange={(event) => setDate(event.target.value)}
						/>
						<br></br>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="place"
							onChange={(event) => setPlace(event.target.value)}
						/>
						<br></br>
					</Form.Group>
					<Button variant="primary" type="submit">
						View Bookings
					</Button>
				</Form>
			</div>
			<ShowTableData bookings={bookings} headings={headings} submitHandler1={submitHandler1}/>
		</div>
	);
};
export default ViewBooking;
