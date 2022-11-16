import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Nav from "./Nav";
import axios from "axios";

function AddPlaces() {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState();
	const [mycar, setMyCar] = useState("Exclusive wash");
	const [desc, setDesc] = useState("this is exclusive wash");
	const services = [
		"Standard wash",
		"Exclusive wash",
		"professional wash",
		"premium wash",
	];
	const arr = ["foam-wash", "interiorpolish", "polish", "A/cvents"];

	const handleChange = (event) => {
		const value = event.target.value;
		setMyCar(value);
		if (value == "Exclusive wash") {
			setDesc(arr[0]);
		} else if (value == "Standard wash") {
			setDesc(arr[1]);
		} else {
			setDesc(arr[2]);
		}
		console.log("hello");
	};

	const divStyle = {
		marginTop: "180px",
		marginRight: "33%",
		width: "350px",

		marginLeft: "33%",
	};

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:4000/admin/addCarCenter", {
				name,
				location,
				email,
				phone,
				services,
			})
			.then((res) => {
				alert("Service added");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div style={divStyle}>
			<Nav />
			<h4>Add Places</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					{/* <Form.Label>Enter your full name:</Form.Label> */}
					<Form.Control
						type="text"
						value={name}
						placeholder="Car center Name"
						onChange={(e) => setName(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="text"
						value={location}
						placeholder="Enter Location"
						onChange={(e) => setLocation(e.target.value)}
					/>
					<br></br>
				</Form.Group>

				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="text"
						value={phone}
						placeholder="Enter Location"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<br></br>
				</Form.Group>

				<Form.Group>
					<Dropdown value={mycar} onChange={handleChange}>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{mycar}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item eventKey={services[0]}>
								Standard wash
							</Dropdown.Item>
							<Dropdown.Item eventKey={services[1]}>
								Exclusive wash
							</Dropdown.Item>
							<Dropdown.Item eventKey={services[2]}>
								Professional wash
							</Dropdown.Item>
							<Dropdown.Item eventKey={services[3]}>premium wash</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<br></br>
				</Form.Group>

				<Button variant="primary" type="submit">
					Add Place
				</Button>
			</Form>
			<p>{desc}</p>
		</div>
	);
}

export default AddPlaces;
