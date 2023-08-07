import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedComponent from "../../AnimatedComponent";
import Logo from "../../assets/images/logo/favicon-1.webp";
import Quadrafort from "../../assets/images/logo/quadrafort-light.webp";
import LogoFavi from "../../assets/images/logo/quadrafort-logo.webp";
import Icon from "../../assets/images/logo/ms.svg";

// import * as msal from "msal";
import { PublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser"; // Import the InteractionRequiredAuthError class from MSAL
import { base_url } from "../../api/base_url";

const config = {
  auth: {
    clientId: "427bf882-77ea-49c0-853e-1676532387a7",
    authority:
      "https://login.microsoftonline.com/de7de043-fa62-4bc0-83e5-0466b479d2b7",
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: "http://localhost:3000/#/login",
  },
};

const msalInstance = new PublicClientApplication(config);
const loginRequest = {
  scopes: ["openid", "profile", "user.read"],
  prompt: "select_account",
};

function Login() {
  // msal auth
  const [error, setError] = useState(null);

  // Check if there is already an interaction in progress

  async function handleMicrosoftLogin(account) {
    const userData = { name: account.name, email: account.username };

    localStorage.setItem("userdetails", JSON.stringify(userData));

    try {
      const response = await fetch(base_url + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: account.username }),
      });

      const data = await response.json();
      if (data) {
        await handleDataInput(data.authToken);
        setMsgToShow("Login");
        data.errors ? errMsg() : verificationMsg();
        setTimeout(closeMsg, 2500);
        clearFields();
      } else {
        // handle login failure here, e.g. show an error message
        setMsgToShow("LoginFailed");
        errorMsg();
        setTimeout(closeMsg, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const login = async () => {
    try {
      // Try to get the user account silently
      const accounts = msalInstance.getAllAccounts();
      const account = accounts[0];
      // console.log(msalInstance.getAllAccounts());

      // If an account is found, set the active account
      if (account) {
        msalInstance.setActiveAccount(account);
        await handleMicrosoftLogin(account);
        // ... do something with the authenticated user
      } else {
        // If no account is found, initiate an interactive login request
        await msalInstance
          .loginPopup(loginRequest)
          .then((response) => {
            if (response.account) {
              login();
            }
            return response;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
          });
      }
    } catch (error) {
      // Check if the error is an InteractionRequiredAuthError
      if (error instanceof InteractionRequiredAuthError) {
        // Wait for the current interaction to complete before initiating a new one
        setTimeout(() => {
          login();
        }, 1000);
      } else {
        // Handle other errors
        // ...
      }
    }
  };

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
      localStorage.setItem("authToken", data);
      localStorage.setItem(
        "TimeLoggedIn",
        JSON.stringify({
          time: new Date(),
        })
      );
    }
    if (localStorage.getItem("authToken")) {
      navigate("/newdsr");
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
        // console.log(data);
        setMsgToShow("Login");
        data.errors ? errMsg() : verificationMsg();
        setTimeout(closeMsg, 2500);
        clearFields();
      } else {
        // handle login failure here, e.g. show an error message
        setMsgToShow("LoginFailed");
        errorMsg();
        setTimeout(closeMsg, 2500);
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

    error && console.log(error);
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
              <div className="logo-part">
                <img src={LogoFavi} alt="icon" className="favicon" />
                <h1 className="heading-s">Login</h1>
              </div>

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
              {/* <Link to={"/register"}>
								<p className="goto-register">New User? Register</p>
							</Link> */}

              {/* Register using Microsoft */}
              <p className="align-self">Or</p>

              <div className="ms">
                <div
                  className="btn btn-primary btn-light-shadow micro"
                  onClick={() => login()}
                >
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
