import react from "react";
import axios from "axios";

const ShowTableData = (props) => {
	const bookings = props.bookings;
	const headings = props.headings;
	const submitHandler = (event) => {
		props.submitHandler1(event.target.id, event.target.value);
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						{headings.map((heading, index) => {
							return <th key={index}>{heading}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking, index) => {
						return (
							<tr key={index}>
								<td>{booking.carCenterName}</td>
								<td>{booking.phone}</td>
								<td>{booking.userName}</td>
								<td>{booking.slot.date.substr(0,10)}</td>
								<td>{booking.slot.timeSlot}</td>
								<td>{booking.serviceOpted}</td>
								<td>{booking.status}</td>
								<td>
									{booking.status == "Pending" ? (
										<div>
											<button
												id={booking._id}
												value="Accepted"
												onClick={submitHandler}
											>
												Accept
											</button>
											<button
												id={booking._id}
												value="Rejected"
												onClick={submitHandler}
											>
												Reject
											</button>
										</div>
									) : (
										" "
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ShowTableData;
