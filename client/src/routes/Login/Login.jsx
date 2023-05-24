import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedComponent from "../../AnimatedComponent";
import Logo from "../../assets/images/logo/favicon-1.png";
import Quadrafort from "../../assets/images/logo/quadrafort-light.png";
import Icon from "../../assets/images/logo/ms.svg";

function Login() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    setUserDetail({
      ...userDetail,
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
      handleLogin(e);
    }
  };

  function validateForm() {
    let isValid = true;

    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!userDetail.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!userDetail.email.toLowerCase().endsWith("@quadrafort.com")) {
      newErrors.email = "Use @quadrafort domain instead!";
      isValid = false;
    }

    // Password validation
    if (!userDetail.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (userDetail.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

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
    try {
      const response = await fetch("https://new-web-app.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetail),
      });

      const data = await response.json();
      if (data.id) {
        await handleDataInput(data);
        console.log(data);
        setMsgToShow("Login");
        data.errors ? errMsg() : verificationMsg();
        setTimeout(closeMsg, 2500);
        clearFields();
      } else {
        // handle login failure here, e.g. show an error message
        setMsgToShow("LoginFailed");
        errorMsg();
        setTimeout(closeMsg, 2500);
        console.log("Login failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Show message notification
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

  // Clearing State
  function clearFields() {
    setUserDetail({
      email: "",
      password: "",
    });

    setErrors({
      email: "",
      password: "",
    });
  }

  return (
    // Adding animated component to make the route change animated -- Adarsh(19-Apr)
    <AnimatedComponent>
      <div className="login-container">
        <div className={`verification-cta ${msg ? "show-verification" : ""}`}>
          <h3 className="heading-xs">
            {msgToShow === "Login" && "Welcome Back! 🎉"}
          </h3>
        </div>

        <div
          className={`verification-cta error-cta ${
            errMsg ? "show-verification" : ""
          }`}
        >
          <h3 className="heading-xs">
            {msgToShow === "LoginFailed" &&
              "Please check your Email and Password! 💀"}
          </h3>
        </div>

        <div className="login-card">
          <div className="part text-part">
            <div className="top-part">
              <div className="logo-part">
                <img src={Logo} alt="logo" className="logo" />
                <h1 className="heading-s">LeafLog</h1>
              </div>

              <p className="para">
                Welcome Back! <br /> Sign In to Manage your DSR.
              </p>
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
                      value={userDetail.password}
                      onChange={handleChange}
                      required
                    />

                    {errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
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
              <Link to={"/register"}>
                <p className="goto-register">New User? Register</p>
              </Link>

              {/* Register using Microsoft */}
              <p className="align-self">Or</p>

              <div className="ms">
                <p className="small">(Comming Soon...)</p>
                <div className="btn btn-primary btn-light-shadow micro">
                  <img src={Icon} alt="ms-login" />
                  <p>Sign in with Microsoft</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
}

export default Login;
