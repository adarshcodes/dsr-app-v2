import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo/logo-leaf.svg";
// import Avatar from "../../assets/images/avatar.jpg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Topbar({ ham, setHam, themeSwitch, theme, setTheme }) {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("usercred");
    setLogout(true);
    setTheme(false);
    navigate("/login");
  };

  // To show greeting message based on time
	// const [showProfile, setShowProfile] = useState(false);

	// function handleProfile() {
	//   setShowProfile(true);
	// }
	// To show greeting message based on time

	const [userName] = useState(JSON.parse(localStorage.getItem("usercred")));

	const hour = new Date().getHours();
	const greet = ["Good morning", "Good afternoon", "Good evening"];
	let welcomeText = "";
	if (hour < 12) welcomeText = greet[0];
	else if (hour < 18) welcomeText = greet[1];
	else welcomeText = greet[2];

  return (
    <div className="topbar">
      <div className="greet">
        <div
          className={`ham ${ham ? "active-ham" : ""}`}
          onClick={() => setHam(!ham)}
        >
          <label htmlFor="ham-click" id="ham">
            <div className="menu-icons">
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line3"></div>
            </div>
          </label>
        </div>

				<div className="logo-phone">
					<img src={Logo} alt="Logo" />
				</div>

				<h4 className="heading-tiny">
					{welcomeText},{" "}
					<span className="highlight">{`${userName.name.split(" ")[0]}!`}</span>
				</h4>
			</div>

			<div className="topbar-ctas">
				<div className="circle-cta">
					<ThemeToggle themeSwitch={themeSwitch} theme={theme} />
				</div>

				{/* <div className="avatar circle-cta">
					<img src={Avatar} alt="avatar" />
				</div> */}

				<div className="logout circle-cta" onClick={() => handleLogout()}>
					<i className="fa-solid fa-arrow-right-from-bracket"></i>
				</div>
			</div>
		</div>
	);
}

export default Topbar;
