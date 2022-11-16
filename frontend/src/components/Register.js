import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../App.css";
export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState();
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState();

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:4000/admin/register", {
				username,
				password,
				email,
				phone,
			})
			.then((res) => {
				window.location = "/login";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="divStyle">
			<h1>CAR WASH APP</h1>
			<h4>Sign Up</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					{/* <Form.Label>Enter your full name:</Form.Label> */}
					<Form.Control
						type="text"
						style={{ padding: "15px" }}
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						style={{ padding: "15px" }}
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						style={{ padding: "15px" }}
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						style={{ padding: "15px" }}
						type="number"
						placeholder="Phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Button variant="primary" type="submit">
					SignUP
				</Button>
			</Form>
		</div>
	);
}
