import React, { useState, useEffect } from "react";

import AnimatedComponent from "../../AnimatedComponent";
import RecentSkeleton from "../../components/Skeleton/RecentSkeleton";

function Drafts() {
	// State to save drafts from API call
	const [drafts, setDrafts] = useState([]);
	// State to set the Loading skeleton
	const [loading, setLoading] = useState(true);

	// Fetching drafts data from API using Async
	const fetchDrafts = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				"https://new-web-app.onrender.com/users/draft",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ user: "64417870bc83e4becb95f97d" }),
				}
			);
			const data = await response.json();
			setDrafts(data);
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchDrafts();
	}, []);

	// Mapping drafts in to React component

	const cardDraft = drafts.map((data) => {
		// formatting date and time from API data
		let date = new Date(data.date);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();

		// let hour = date.getHours();
		// let min = date.getMinutes();
		// let ampm = hour >= 12 ? "PM" : "AM";
		// hour = hour % 12;
		// hour = hour ? hour : 12; // the hour '0' should be '12'
		// min = min < 10 ? "0" + min : min;
		// let time = hour + ":" + min + " " + ampm;

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

		let dateOfCreation = day + "/" + monthArray[month] + "/" + year;

		return (
			<div key={data._id}>
				<div className="draft-card recents-card card">
					<div className="info">
						<div className="data date">
							<h4 className="heading-xs">Date of Creation</h4>
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

					<div className="cta">
						<button className="btn btn-dark btn-view">Use</button>

						<button className="btn btn-dark btn-error">Delete</button>
					</div>
				</div>
			</div>
		);
	});

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<div className="recents">
				<h3 className="heading-s">Your Saved Drafts</h3>

				<div className="recents-card-container card-container">
					<div className="scroll-parent">
						{loading
							? Array.from({ length: 10 }, (_, i) => <RecentSkeleton key={i} />)
							: cardDraft}
					</div>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default Drafts;
