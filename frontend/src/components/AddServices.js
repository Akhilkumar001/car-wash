import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Nav from "./Nav";
import axios from "axios";
export default function Register() {
	const [vehicle, setVehicle] = useState("Select vehicle size");
	const [id, setId] = useState();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();

	const divStyle = {
		marginTop: "180px",
		marginRight: "33%",
		width: "350px",

		marginLeft: "33%",
	};

	const handler = (event) => {
		setVehicle(event);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:4000/admin/addServices", {
				id,
				name,
				description,
				vehicle,
				price,
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
			<h4>Add Services</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					{/* <Form.Label>Enter your full name:</Form.Label> */}
					<Form.Control
						type="text"
						value={id}
						placeholder="enter service id"
						onChange={(e) => setId(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="text"
						value={name}
						placeholder="enter service name"
						onChange={(e) => setName(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Dropdown onSelect={handler}>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{vehicle}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item eventKey="small">small</Dropdown.Item>
							<Dropdown.Item eventKey="medium">medium</Dropdown.Item>
							<Dropdown.Item eventKey="compact suv">compact suv</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="number"
						placeholder="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Button variant="primary" type="submit">
					Add service
				</Button>
			</Form>
		</div>
	);
}
