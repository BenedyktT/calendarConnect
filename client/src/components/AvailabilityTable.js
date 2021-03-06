import React, { useEffect } from "react";
import { loadAvailability } from "../redux/actions/availability";
import { connect } from "react-redux";

const AvailabilityTable = ({
	availability,
	isDateRangeSelected,
	startDate,
	endDate,
	loadAvailability
}) => {
	useEffect(() => {
		loadAvailability();
	}, []);
	useEffect(() => {
		if (isDateRangeSelected) {
			loadAvailability(startDate, endDate);
		}
	}, [isDateRangeSelected, startDate, endDate]);
	return (
		<div className="table-wrapper container">
			<table className="blueTable">
				<thead>
					<tr>
						<th></th>
						<th>Availability</th>
						<th>Rate</th>
					</tr>
				</thead>

				<tbody>
					{availability &&
						availability
							.filter(
								e => /* !e.desc.includes("1P") &&  */ !e.desc.includes("-5%")
							)
							.sort((a, b) => (a.desc > b.desc ? 1 : -1))
							.map(roomType => (
								<tr key={roomType.desc}>
									<td>{roomType.desc}</td>
									<td>{roomType.dayAvail.available}</td>
									<td>
										{roomType.dayAvail.rate} {roomType.currency}
									</td>
								</tr>
							))}
				</tbody>
			</table>
		</div>
	);
};

export default connect(
	state => ({
		availability: state.availability.availability,
		startDate: state.availability.startDate,
		endDate: state.availability.endDate,
		isDateRangeSelected: state.availability.isDateRangeSelected
	}),
	{ loadAvailability }
)(AvailabilityTable);
