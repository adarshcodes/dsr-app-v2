import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AnimatedComponent from "../../AnimatedComponent";
import Button from "../../components/Buttons/Button";
import RecentSkeleton from "../../components/Skeleton/RecentSkeleton";

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
			body: JSON.stringify({ user: "64417870bc83e4becb95f97d" }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
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
		return (
			<div key={data._id}>
				<div className="recents-card card">
					{data.isOnLeave ? (
						"Leave"
					) : (
						<div className="info">
							<div className="data date">
								<h4 className="heading-xs">Date of Submission</h4>
								<p className="para date">{data.date}</p>
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

					<div className="cta" onClick={(e) => setSlider(data._id)}>
						<Button value={"View"} varient={"dark"} customClass={"btn-view"} />
					</div>
				</div>

				<div
					className={`view-slider ${slider === data._id ? "show-slider" : ""}`}
				>
					<div className="close-btn" onClick={(e) => setSlider(false)}>
						<i class="fa-solid fa-angle-right"></i>
					</div>

					<div className="dsr-details">
						<h3 className="heading-s dsr-title">DSR Details</h3>

						<div className="details">
							<div className="data">
								<h4 className="heading-xs">Date:</h4>
								<p className="para">{data.date}</p>
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
		<AnimatedComponent>
			<div className="recents">
				<h3 className="heading-s">View Your Last 5 DSR</h3>

				<div className="recents-card-container card-container">
					<div className="scroll-parent">
						{loading ? Array(5).fill(<RecentSkeleton />) : cardDsr}
					</div>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default WeeklyDsr;
