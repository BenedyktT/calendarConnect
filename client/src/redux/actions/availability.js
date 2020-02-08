import { SET_CALENDAR, LOAD_AVAILABILITY } from "./types";

import moment from "moment";
import axios from "axios";

export const loadAvailability = (
	startDate = moment(),
	endDate = moment().add(1, "day"),
	rate
) => async dispatch => {
	try {
		startDate = moment(startDate).format("YYYY-MM-DD");
		endDate = moment(endDate).format("YYYY-MM-DD");
		if (!rate) {
			const res = await axios.get(`/availability/${startDate}/${endDate}/LAKI`);
			dispatch({
				type: LOAD_AVAILABILITY,
				payload: res.data
			});
		} else {
			const res = await axios.get(
				`/availability/admin/${startDate}/${endDate}/LAKI/${rate}`
			);
			dispatch({
				type: LOAD_AVAILABILITY,
				payload: res.data
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const setCalendar = (startDate, endDate) => dispatch => {
	dispatch({
		type: SET_CALENDAR,
		payload: { startDate, endDate }
	});
};
