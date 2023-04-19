import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo/logo-leaf.svg";
import Icon from "../../assets/images/logo/ms.svg";
import Quadrafort from "../../assets/images/logo/quadrafort-dark.png";
import Button from "../../components/Buttons/Button";

function Login() {
	return (
		<div className="login-container">
			<div className="login-card">
				<div className="top-part">
					<img src={Logo} alt="logo" className="logo" />

					<h1 className="heading-s">LeafLog</h1>
					<p className="para">Stay connected to your Work and Nature</p>
				</div>

				<form className="form login-form">
					<Link to="/">
						<Button
							value={"Sign in with Microsoft"}
							varient={"btn-light"}
							customClass={"btn-light-shadow"}
							icon={Icon}
						/>
					</Link>
				</form>

				<div className="branding">
					Proudly by
					<img src={Quadrafort} alt="Quadrafort" className="quadra-logo" />
				</div>
			</div>
		</div>
	);
}

export default Login;
