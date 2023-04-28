import React, { useState } from "react";
import Icon from "../../assets/images/logo/ms.svg";
import Logo from "../../assets/images/logo/logo-leaf.svg";
import Quadrafort from "../../assets/images/logo/quadrafort-dark.png";
import { Link } from "react-router-dom";
import AnimatedComponent from "../../AnimatedComponent";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      setEmailError("Email is required");
    } else if (!email.endsWith("@Quadrafort.com")) {
      setEmailError("Invalid email domain");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm password");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    // Handle registration with email and password if no errors
    if (!emailError && !passwordError && !confirmPasswordError) {
      // Registration logic
    }
  };

  return (
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
            <h1 className="heading-s">Register</h1>
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
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && <div className="error">{emailError}</div>}
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
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && (
                    <div className="error">{passwordError}</div>
                  )}
                </div>
                <div className="input__group">
                  <label htmlFor="confirm-password" className="input__label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm Your Password"
                    className="form__input"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {confirmPasswordError && (
                    <div className="error">{confirmPasswordError}</div>
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
              <p className="goto-register">Already Register? Sign in</p>
            </Link>

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
};
