import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimatedComponent from "../../AnimatedComponent";
import Logo from "../../assets/images/logo/logo-leaf.svg";
import Icon from "../../assets/images/logo/ms.svg";
import Quadrafort from "../../assets/images/logo/quadrafort-dark.png";

function Login() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  const handleDataInput = async (data) => {
    if (data) {
      localStorage.setItem("usercred", JSON.stringify(data));
    }
    if (localStorage.getItem("usercred")) {
      navigate("/");
    }
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("handlelogin started");
    try {
      // e.preventDefault();
      const response = await fetch("https://new-web-app.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetail),
      });

      const data = await response.json();

      // console.log(data);
      if (data.id) {
        await handleDataInput(data);
      } else {
        // handle login failure here, e.g. show an error message
        console.log("Login failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setUserDetail({
      ...userDetail,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    // if (!email) {
    //   setEmailError("Email is required");
    // } else if (!email.endsWith("@Quadrafort.com")) {
    //   setEmailError("Invalid email domain");
    // }

    // // Password validation
    // if (!password) {
    //   setPasswordError("Password is required");
    // } else if (password.length < 6) {
    //   setPasswordError("Password must be at least 6 characters long");
    // }

    // Handle authentication with email and password if no errors
    // if (!emailError && !passwordError) {
    console.log("submit button pressed");
    handleLogin();
    // }
  };

  return (
    // Adding animated component to make the route change animated -- Adarsh(19-Apr)
    <AnimatedComponent>
      <div className="login-container">
        <div className="login-card">
          <div className="top-part">
            <img src={Logo} alt="logo" className="logo" />

            <h1 className="heading-s">LeafLog</h1>
            <p className="para">Stay connected to your Work and Nature</p>
            <div className="branding">
              a solution by
              <img src={Quadrafort} alt="Quadrafort" className="quadra-logo" />
            </div>
          </div>

          <form className="form">
            <h1 className="heading-s">Login</h1>
            <div className="input-row">
              <div className="form-group">
                <div className="input__group">
                  <label htmlFor="email" className="input__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="@Quadrafort.com"
                    className="form__input"
                    name="email"
                    value={userDetail.email}
                    onChange={handleChange}
                    required
                  />
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
                    value={userDetail.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* <Link to="/" className="align-self"> */}
            <button
              type="submit"
              className="btn btn-dark"
              onClick={(e) => handleSubmit(e)}
            >
              Sign in
            </button>
            {/* <Link to={"/register"}> */}
            <p className="goto-register">New User? Register</p>
            {/* </Link> */}
            <p className="align-self">Or</p>
            {/* </Link> */}
            <div className="btn btn-primary btn-light-shadow micro">
              <img src={Icon} alt="ms-login" />
              <p>Sign in with Microsoft</p>
              <p className="small">Comming Soon...</p>
            </div>
          </form>
        </div>
      </div>
    </AnimatedComponent>
  );
}

export default Login;
