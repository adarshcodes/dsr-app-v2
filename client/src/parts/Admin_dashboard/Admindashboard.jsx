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

  const [selectedManager, setSelectedManager] = useState("Select");
  const [selectedByDate, setSelectedByDate] = useState("Select");
  const [isOpenManager, setIsOpenManager] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const options = [
    { label: "Shashwat Sir" },
    { label: "Sanatan Sir" },
    { label: "Himanshu Sir" },
  ];

  const options2 = [{ label: "Today's DSRs" }, { label: "All DSRs" }];

  const handleManager = (option) => {
    console.log(option.label);

    setSelectedManager(option.label);
    setIsOpenManager(false);
  };
  const handleDate = (option) => {
    console.log(option.label);

    setSelectedByDate(option.label);
    setIsOpenDate(false);
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
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      <h1>09</h1>
                      <small>Today's DSR</small>
                    </div>
                    <div>
                      <i className="fas fa-mug-hot"></i>
                      <h1>05</h1>
                      <small>Marked Leave</small>
                    </div>
                    <div>
                      <i className="fa fa-ban" aria-hidden="true"></i>
                      <h1>12</h1>
                      <small>Unmarked</small>
                    </div>
                    <div>
                      <i className="fa-solid fa-leaf"></i>
                      <h1>120</h1>
                      <small>Total DSR (since)</small>
                    </div>
                    <div>
                      <i className="fas fa-layer-group"></i>
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
                      </div>
                      <div className="input__group">
                        <Dropdown
                          selectedOption={selectedManager}
                          isOpen={isOpenManager}
                          setIsOpen={setIsOpenManager}
                          options={options}
                          handleOptionClick={handleManager}
                          id="health"
                        />
                      </div>
                      <div className="input__group">
                        <Dropdown
                          selectedOption={selectedByDate}
                          isOpen={isOpenDate}
                          setIsOpen={setIsOpenDate}
                          options={options2}
                          handleOptionClick={handleDate}
                          id="health"
                        />
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>

                <h1 className="heading-s">Today's DSRs</h1>
                <div className="input-row">
                  <div className="today-dsr-container input__group-box">
                    <div className="filled-by input__group">
                      <h4 className="input__label input__label__area input-label">
                        Name
                      </h4>
                      <p>Ayush</p>
                    </div>
                    <div className="time-of-dsr">
                      <h4>Time</h4>
                      <p>6:21pm</p>
                    </div>
                    <div className="total-hrs-worked">
                      <h4>Total Hours</h4>
                      <p>12Hrs</p>
                    </div>
                    <div className="worked-on">
                      <h4>Worked on</h4>
                      <p>Apple</p>
                    </div>
                    <div className="reviewed-by">
                      <h4>Reviewed By</h4>
                      <p>Sanatan Sir</p>
                    </div>
                  </div>
                </div>
                <h1 className="heading-s">Date</h1>
                <div className="today-dsr-container">
                  <div className="filled-by">
                    <h4>Name</h4>
                    <p>Ayush</p>
                  </div>
                  <div className="time-of-dsr">
                    <h4>Time</h4>
                    <p>6:21pm</p>
                  </div>
                  <div className="total-hrs-worked">
                    <h4>Total Hours</h4>
                    <p>12Hrs</p>
                  </div>
                  <div className="worked-on">
                    <h4>Worked on</h4>
                    <p>Apple</p>
                  </div>
                  <div className="reviewed-by">
                    <h4>Reviewed By</h4>
                    <p>Sanatan Sir</p>
                  </div>
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
