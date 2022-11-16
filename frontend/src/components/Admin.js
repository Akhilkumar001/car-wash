import "../App.css";
import React from "react";
import Register from "./Register";
import Login from "./login";
import AddServices from "./AddServices";
import ViewBookings from "./ViewBooking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import AddPlaces from "./AddPlaces";

const AdminUseCases = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/home" element={<Nav />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/addservices" element={<AddServices />}></Route>
					<Route path="/viewbookings" element={<ViewBookings />}></Route>
					<Route path="/addplaces" element={<AddPlaces />}></Route>

				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default AdminUseCases;
