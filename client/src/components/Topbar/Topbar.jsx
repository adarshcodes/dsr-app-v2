import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo/logo-leaf.svg";
import Avatar from "../../assets/images/avatar.jpg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { transfer } from "../../App";

function Topbar({ ham, setHam, themeSwitch }) {
  // To show greeting message based on time

  //   const { usercred } = useContext(transfer);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("usercred");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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

        {userData && (
          <h4 className="heading-tiny">
            {welcomeText},{" "}
            <span className="highlight">{`${userData.name}!`}</span>
          </h4>
        )}
      </div>

      <div className="topbar-ctas">
        <div className="circle-cta">
          <ThemeToggle themeSwitch={themeSwitch} />
        </div>

        <div className="avatar circle-cta">
          <img src={Avatar} alt="avatar" />
        </div>

        <Link to="/login">
          <div className="logout circle-cta">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
