import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Nav = () => {
	return (
		<div className="navbar-ul">
			<ul>
				<li>
					<Link className="linktext" to="/addplaces">
						ADD PLACES
					</Link>
				</li>
				<li>
					<Link className="linktext" to="/addservices">
						ADD SERVICES
					</Link>
				</li>

				<li>
					<Link className="linktext" to="/viewbookings">
						VIEW BOOKINGS
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default Nav;
