import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedComponent from "../../AnimatedComponent";
import RecentSkeleton from "../../components/Skeleton/RecentSkeleton";
// import Api from "../../api/Api";
import { base_url } from "../../api/base_url";

// import { useOutletContext } from "react-router-dom";

function WeeklyDsr() {
  // Adding animated component to make the route change animated -- Adarsh(19-Apr)
  // Using post method to send userID which return the Recents DSR of the user

  const [recents, setRecents] = useState([]);
  const [slider, setSlider] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(base_url + "/dsr/recent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        // body: localStorage.getItem("authToken"),
      });
      const data = await response.json();

      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
        return;
      }
      setRecents(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(recents);

  // Mapping fetched DSR to display as a card in recents tab
  const cardDsr = recents.map((data) => {
    let CurrentTimeData = new Date();
    // formatting date and time from API data
    let date = new Date(data.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth();
    let currentDay = CurrentTimeData.getDate();
    let day = date.getDate();
    day =
      date.getDate() === currentDay
        ? "Today"
        : date.getDate() === currentDay - 1
        ? "Yesterday"
        : date.getDate();

    let hour = date.getHours();
    let min = date.getMinutes();
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? "0" + min : min;
    let time = hour + ":" + min + " " + ampm;

    let monthArray = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let dateOfCreation =
      day === "Today" || day === "Yesterday"
        ? day
        : day + " " + monthArray[month] + " " + year;

    return (
      <div key={data._id}>
        <div className="recents-card card">
          {data.isOnLeave ? (
            <h4 className="heading-xs leave-cta">
              <i className="fa-solid fa-person-walking-arrow-right"></i> You
              Marked the DSR as Leave on {dateOfCreation}
            </h4>
          ) : (
            <div className="Current-cards">
              <div className="data date">
                {/* <h4 className="heading-xs">Date of Submission</h4> */}
                <p className="para date">{dateOfCreation}</p>
              </div>
              {data.list.map((item, index) => {
                return (
                  <div className="info" key={index}>
                    <div
                      className="contain-details"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="data project-name">
                        <h4 className="heading-xs">Project</h4>
                        <p className="para para-bold">
                          {item.project !== undefined &&
                            (item.other_project
                              ? item.other_project
                              : item.project.name)}
                        </p>
                      </div>
                      <div className="data health-name">
                        <h4 className="heading-xs">Health</h4>
                        <p className="para para-bold">
                          {item.health !== undefined && item.health}
                        </p>
                      </div>
                      <div className="data hrs-worked">
                        <h4 className="heading-xs">Hours Worked</h4>
                        <p className="para">{item.hoursWorked}hrs</p>
                      </div>
                      <div className="data client-manager">
                        <h4 className="heading-xs">Manager</h4>
                        <p className="para">
                          {item.project !== undefined &&
                            (item.other_manager
                              ? item.other_manager
                              : item.project.manager)}
                        </p>
                      </div>
                    </div>

                    {item.isOnLeave ? (
                      ""
                    ) : (
                      <div className="cta">
                        <button
                          className="btn btn-dark btn-view"
                          onClick={(e) =>
                            setSlider({ _id: data._id, project: item.project })
                          }
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {data.list.map((item, index) => (
          <div
            key={index}
            className={`view-slider ${
              slider.project === item.project && slider._id === data._id
                ? "show-slider"
                : ""
            }`}
          >
            {console.log(item.project)}
            <div className="close-btn" onClick={(e) => setSlider(false)}>
              <i className="fa-solid fa-angle-right"></i>
            </div>

            <div className="dsr-details">
              <h3 className="heading-s dsr-title">DSR Details</h3>

              <div className="details">
                <div className="data">
                  <h4 className="heading-xs">Date & Time:</h4>
                  <p className="para">{dateOfCreation + ",  " + time}</p>
                </div>
                {console.log(item.other_manager)}
                <div className="data">
                  <h4 className="heading-xs">Project:</h4>
                  <p className="para">
                    {item.project !== undefined &&
                      (item.other_project
                        ? item.other_project
                        : item.project.name)}
                  </p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Manager:</h4>
                  <p className="para">
                    {item.project !== undefined &&
                      (item.other_manager
                        ? item.other_manager
                        : item.project.manager)}
                  </p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Hours Worked:</h4>
                  <p className="para">{item.hoursWorked} Hrs</p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Project Health:</h4>
                  <p className="para" style={{ color: `${item.health}` }}>
                    {item.health}
                  </p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Activities Completed:</h4>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: item.activitiesCompleted,
                    }}
                  ></p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Activities Planned:</h4>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: item.activitiesPlanned,
                    }}
                  ></p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Open Issues:</h4>
                  <p className="para">{item.openIssues}</p>
                </div>

                <div className="data">
                  <h4 className="heading-xs">Comments:</h4>
                  <p className="para">{item.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  });

  return (
    <HelmetProvider>
      <AnimatedComponent>
        <Helmet>
          <title>Your Weekly DSR | LeafLog-Quadrafort</title>
        </Helmet>
        <div className="recents">
          <h3 className="heading-s">View Your Last 5 DSR</h3>

          <div className="recents-card-container card-container">
            <div className="scroll-parent">
              {loading ? (
                Array.from({ length: 10 }, (_, i) => <RecentSkeleton key={i} />)
              ) : cardDsr.length > 0 ? (
                cardDsr
              ) : (
                <div className="blank-page">
                  <h3 className="heading-s">
                    <i className="fa-solid fa-umbrella-beach"></i>
                    <br /> There is no DSR recorded yet! <br />
                    You can add DSR from the New DSR page!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedComponent>
    </HelmetProvider>
  );
}

export default WeeklyDsr;
