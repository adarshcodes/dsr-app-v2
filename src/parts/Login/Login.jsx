import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo/logo-leaf.svg";
import Quadrafort from "../../assets/images/logo/quadrafort-dark.png";
import ButtonDark from "../../components/Buttons/ButtonDark";

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
					<div className="input-row">
						<input type="email" placeholder="Email address" id="login-email" />
					</div>
					<div className="input-row">
						<input type="password" placeholder="Password" id="login-password" />
					</div>

					<Link to="/">
						<ButtonDark
							value={"Sign In"}
							varient={"dark"}
							customClass={"login-btn"}
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
