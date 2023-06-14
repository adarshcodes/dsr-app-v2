import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import AnimatedComponent from "../../AnimatedComponent";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Admindashboard({ theme, themeSwitch, setTheme }) {
  const location = useLocation();
  const [ham, setHam] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Manager");
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "Shashwat Sir" },
    { label: "Sanatan Sir" },
    { label: "Himanshu Sir" },
  ];

  const handleOptionClick = (option) => {
    console.log(option.label);

    setSelectedOption(option.label);
    setIsOpen(false);

    // setDsrData({
    //   ...dsrData,
    //   status: option.label,
    // });

    // setDraftData({
    //   ...draftData,
    //   status: option.label,
    // });
  };

  return (
    <HelmetProvider>
      <AnimatedComponent>
        <Helmet>
          <title>Dashboard | LeafLog-Quadrafort</title>
        </Helmet>
        <div className="dashboard">
          <Sidebar
            location={location}
            theme={theme}
            ham={ham}
            setHam={setHam}
          />
          <section className="main-content">
            <Topbar
              ham={ham}
              setHam={setHam}
              themeSwitch={themeSwitch}
              theme={theme}
              setTheme={setTheme}
            />
            <div className="container">
              <h1 className="heading-s">Dashboard</h1>
              <div className="card-container">
                <div className="stats-data">
                  <section>
                    <div>
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <h1>09</h1>
                      <small>Today's DSR</small>
                    </div>
                    <div>
                      <i class="fas fa-mug-hot"></i>
                      <h1>05</h1>
                      <small>Marked Leave</small>
                    </div>
                    <div>
                      <i class="fa fa-ban" aria-hidden="true"></i>
                      <h1>12</h1>
                      <small>Unmarked</small>
                    </div>
                    <div>
                      <i class="fa-solid fa-leaf"></i>
                      <h1>120</h1>
                      <small>Total DSR (since)</small>
                    </div>
                    <div>
                      <i class="fas fa-layer-group"></i>
                      <h1>50</h1>
                      <small>Total EMP</small>
                    </div>
                  </section>
                </div>

                <div className="form login-form">
                  <div className="input-row">
                    <div className="input__group-box">
                      <div className="input__group">
                        <input
                          type="text"
                          placeholder="Search Employee"
                          className={`form__input form-input`}
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div className="input__group">
                        <Dropdown
                          selectedOption={selectedOption}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          options={options}
                          handleOptionClick={handleOptionClick}
                          id="health"
                        />
                        {/* 
                  <label
                    htmlFor="health"
                    className="input__label input__label__area input-label"
                  >
                    Select Project Health <sup>&nbsp;</sup>
                  </label> */}
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </AnimatedComponent>
    </HelmetProvider>
  );
}

export default Admindashboard;
