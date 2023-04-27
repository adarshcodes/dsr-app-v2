import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedComponent from "../../AnimatedComponent";
import RecentSkeleton from "../../components/Skeleton/RecentSkeleton";

let userId = "6448cd7e09f1d7a9cc85ba1e";
function WeeklyDsr() {
	// Adding animated component to make the route change animated -- Adarsh(19-Apr)

	// Using post method to send userID which return the Recents DSR of the user
	const [recents, setRecents] = useState([]);
	const [slider, setSlider] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchData = () => {
		setLoading(true);
		return fetch("https://new-web-app.onrender.com/users/dsr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: userId }),
		})
			.then((response) => response.json())
			.then((data) => {
				setRecents(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	// Mapping fetched DSR to display as a card in recents tab
	const cardDsr = recents.map((data) => {
		// formatting date and time from API data
		let date = new Date(data.date);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();

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
		let dateOfCreation = day + " " + monthArray[month] + " " + year;

		return (
			<div key={data._id}>
				<div className="recents-card card">
					{data.isOnLeave ? (
						<h4 className="heading-xs leave-cta">
							<i className="fa-solid fa-person-walking-arrow-right"></i> You
							Marked the DSR as Leave on {dateOfCreation}
						</h4>
					) : (
						<div className="info">
							<div className="data date">
								<h4 className="heading-xs">Date of Submission</h4>
								<p className="para date">{dateOfCreation}</p>
							</div>

							<div className="data project-name">
								<h4 className="heading-xs">Project Name</h4>
								<p className="para para-bold">{data.projectName}</p>
							</div>

							<div className="data hrs-worked">
								<h4 className="heading-xs">Hours Worked</h4>
								<p className="para">{data.hoursWorked}hrs</p>
							</div>

							<div className="data client-manager">
								<h4 className="heading-xs">Client Manager</h4>
								<p className="para">{data.clientManager}</p>
							</div>
						</div>
					)}

					{data.isOnLeave ? (
						""
					) : (
						<div className="cta">
							<button
								className="btn btn-dark btn-view"
								onClick={(e) => setSlider(data._id)}
							>
								View
							</button>
						</div>
					)}
				</div>

				<div
					className={`view-slider ${slider === data._id ? "show-slider" : ""}`}
				>
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

							<div className="data">
								<h4 className="heading-xs">Project:</h4>
								<p className="para">{data.projectName}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Client Manager:</h4>
								<p className="para">{data.clientManager}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Hours Worked:</h4>
								<p className="para">{data.hoursWorked} Hrs</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Project Health:</h4>
								<p className="para">{data.status}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Activities Completed:</h4>
								<p className="para">{data.activitiesCompleted}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Activities Planned:</h4>
								<p className="para">{data.activitiesPlanned}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Open Issues:</h4>
								<p className="para">{data.openIssues}</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Comments:</h4>
								<p className="para">{data.comment}</p>
							</div>
						</div>
					</div>
				</div>
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
					{cardDsr.length > 0 ? (
						<div className="scroll-parent">
							{loading
								? Array.from({ length: 10 }, (_, i) => (
										<RecentSkeleton key={i} />
								  ))
								: cardDsr}
						</div>
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
		</AnimatedComponent>
    </HelmetProvider>
	);
}

export default WeeklyDsr;
