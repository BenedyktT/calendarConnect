import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/auth";
import { setAlert } from "../redux/actions/alerts";
import { Link } from "react-router-dom";

const Login = ({ history, loginUser, isAuthenticated, loading }) => {
	const [inputValue, setInputValue] = useState({ name: null, password: null });

	const onSubmit = async e => {
		const { name, password } = inputValue;
		e.preventDefault();
		if (!name || !password) {
			setAlert("Fill all fields", "danger");
			return;
		}

		let data = {
			name: inputValue.name
				.toLowerCase()
				.trim()
				.replace(/\s/g, ""),
			password: inputValue.password
		};
		try {
			loginUser(data);
		} catch (error) {
			setAlert("Invalid Credentials", "danger");
		}
	};
	const onChange = e => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		if (isAuthenticated && !loading) {
			history.push("/");
		}
	}, [isAuthenticated]);

	return (
		<div className="container border nooverflow">
			<form onSubmit={onSubmit} className="form">
				<div className="input-container">
					<label htmlFor="name">User:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="name"
						type="text"
						autoComplete="username"
					/>
				</div>

				<div className="input-container">
					<label htmlFor="password">Password:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="password"
						type="password"
						autoComplete="password"
					/>
				</div>

				<input className="padding-small margin-y" type="submit" value="Login" />
			</form>
			<div className="register-container">
				<Link style={{ color: "blue" }} to="/forgotpassword">
					Forgot password
				</Link>
				<br />
				<br />
				<h1>or...</h1>
				<br />
				<br />
				<Link className="btn btn-register" to="/register/agency">
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated,
		loading: state.auth.loading
	}),
	{ loginUser }
)(Login);
