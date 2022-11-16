import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const divStyle = {
		marginTop: "180px",
		marginRight: "33%",
		width: "350px",

		marginLeft: "33%",
	};

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:4000/admin/login", { username, password })
			.then((result) => {
				console.log("result", result);
				window.location = "/home";
			})
			.catch(() => {
				console.log("re");
				alert("Invalid Credentials");
			});
	};

	return (
		<div style={divStyle}>
			<h1>CAR WASH APP</h1><br></br>
			<h4>Sign In</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					{/* <Form.Label>Enter your full name:</Form.Label> */}
					<Form.Control
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br></br>
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
			<a href="/register">Don't have an account</a>
		</div>
	);
};
export default Login;
