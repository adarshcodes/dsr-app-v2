import { useState, useEffect } from "react";
import React from "react";

import AnimatedComponent from "../../AnimatedComponent";

function Drafts() {
	const [drafts, setDrafts] = useState([]);

	const fetchDrafts = () => {
		return fetch("https://new-web-app.onrender.com/users/draft", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: "64417870bc83e4becb95f97d" }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				setDrafts(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		fetchDrafts(drafts);
	}, [drafts]);

	const cardDraft = drafts.map((data) => {
		return (
			<div key={data._id}>
				{console.log(`This is date: ${data.date}`)}
				<div className="draft-card recents-card card">
					<div className="info">
						<div className="data date">
							<h4 className="heading-xs">Date of Submission</h4>
							<p className="para date">{data.date.toLocaleString()}</p>
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

	console.log();

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<div className="recents">
				<h3 className="heading-s">Your Saved Drafts</h3>

				<div className="recents-card-container card-container">{cardDraft}</div>
			</div>
		</AnimatedComponent>
	);
}

export default Drafts;
