import React, { useState } from "react";
import Logo from "../../assets/images/logo/favicon-1.png";
import Quadrafort from "../../assets/images/logo/quadrafort-light.png";
import { Link, useNavigate } from "react-router-dom";
import AnimatedComponent from "../../AnimatedComponent";
import LogoFavi from "../../assets/images/logo/favicon-1.png";

function Register() {
	const [registration, setRegistration] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleInput = (e) => {
		let value = e.target.value; // Convert value to lowercase

		setRegistration({
			...registration,
			[e.target.name]: value,
		});

		setErrors({
			...errors,
			[e.target.name]: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			handleRegistration(e);
		}
	};

	function validateForm() {
		let isValid = true;

		const newErrors = {
			name: "",
			email: "",
			password: "",
		};

		// Email validation
		if (!registration.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!registration.email.toLowerCase().endsWith("@quadrafort.com")) {
			newErrors.email = "Use @Quadrafort.com domain instead!";
			isValid = false;
		}

		// Password validation
		if (!registration.password) {
			newErrors.password = "Password is required";
			isValid = false;
		} else if (registration.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
			isValid = false;
		}

		if (!registration.name) {
			newErrors.name = "Fullname is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	}

	const [msgToShow, setMsgToShow] = useState();
	const [msg, setMsg] = useState(false);
	const [errMsg, setErrMsg] = useState(false);

	function verificationMsg() {
		setMsg(true);
	}

	function errorMsg() {
		setErrMsg(true);
	}

	function closeMsg() {
		setMsg(false);
		setErrMsg(false);
	}

	const navigate = useNavigate();
	const handleRegistration = async (e) => {
		try {
			const response = await fetch(
				"https://new-web-app.onrender.com/register/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registration),
				}
			);

			const data = await response.json();
			// Clearing form after Submission
			setMsgToShow("Register");
			data.errors ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 3000);
			setTimeout(function () {
				navigate("/login");
			}, 1000);
			clearFields();
		} catch (err) {
			console.log(err);
			setMsgToShow("UnRegister");
			errorMsg();
			setTimeout(closeMsg, 3000);
		}
	};

	function clearFields() {
		setRegistration({
			name: "",
			email: "",
			password: "",
		});

		setErrors({
			name: "",
			email: "",
			password: "",
		});
	}

	return (
		<AnimatedComponent>
			<div className="login-container">
				<div className={`verification-cta ${msg ? "show-verification" : ""}`}>
					<h3 className="heading-xs">
						{msgToShow === "Register" && "Account Created Successfully! 🎉"}
					</h3>
				</div>

				<div
					className={`verification-cta error-cta ${
						errMsg ? "show-verification" : ""
					}`}
				>
					<h3 className="heading-xs">
						{msgToShow === "UnRegister" &&
							"This email is already Registered! 💀"}
					</h3>
				</div>

				<div className="login-card register-card">
					<div className="part text-part">
						<div className="top-part">
							<div className="logo-part">
								<img src={Logo} alt="logo" className="logo" />
								<h1 className="heading-s">LeafLog</h1>
							</div>

							<p className="para">Stay connected to your Work and Nature</p>

							<div className="branding">
								<img
									src={Quadrafort}
									alt="Quadrafort"
									className="quadra-logo"
								/>
							</div>
						</div>
					</div>

					<div className="part form-part">
						<form className="form">
							<div className="logo-part">
								<img src={LogoFavi} alt="icon" className="favicon" />
								<h1 className="heading-s">Create an Account</h1>
							</div>

							<div className="input-row">
								<div className="form-group">
									<div className="input__group">
										<label htmlFor="full-name" className="input__label">
											Full Name
										</label>
										<input
											type="text"
											id="full-name"
											placeholder="Enter your full name"
											className="form__input"
											value={registration.name}
											name="name"
											onChange={handleInput}
											required
										/>
										{errors.name && <div className="error">{errors.name}</div>}
									</div>

									<div className="input__group">
										<label htmlFor="email" className="input__label">
											Email
										</label>
										<input
											type="email"
											id="email"
											placeholder="@Quadrafort.com"
											className="form__input"
											value={registration.email}
											name="email"
											onChange={handleInput}
											required
										/>
										{errors.email && (
											<div className="error">{errors.email}</div>
										)}
									</div>

									<div className="input__group">
										<label htmlFor="password" className="input__label">
											Password
										</label>
										<input
											type="password"
											id="password"
											name="password"
											placeholder="Enter Your Password"
											className="form__input"
											value={registration.password}
											onChange={handleInput}
											required
										/>
										{errors.password && (
											<div className="error">{errors.password}</div>
										)}
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="btn btn-dark"
								onClick={(e) => handleSubmit(e)}
							>
								Register
							</button>
							<Link to={"/login"}>
								<p className="goto-register">Already Registered? Sign in</p>
							</Link>
						</form>
					</div>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default Register;
