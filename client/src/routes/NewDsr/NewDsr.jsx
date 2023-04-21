import React, { useState, useEffect } from "react";
import Button from "../../components/Buttons/Button";
import AnimatedComponent from "../../AnimatedComponent";

/*
  Written the Code of NewDSR and made it responsive --- Ayush
*/

function NewDsr() {
	// Posting New DSR Data --Adarsh-20-April-2023
	// Creating state to get data from the inputs onChange --Adarsh-20-April-2023

	const [dsrData, setDsrData] = useState({
		date: "2023-04-20T08:33:15.958Z",
		projectName: "",
		clientManager: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
		hoursWorked: 0,
		status: "",
		comment: "",
		openIssues: "",
		isOnLeave: true,
		createdAt: "2023-04-20T08:33:15.958Z",
		updatedAt: "2023-04-20T08:33:15.958Z",
		user: "64417870bc83e4becb95f97d",
	});

	// setting inputs data for draft --20-April-2023--Adarsh
	const [draftData, setDraftData] = useState({
		date: "2023-04-20T08:33:15.958Z",
		projectName: "",
		clientManager: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
		hoursWorked: 0,
		status: "",
		comment: "",
		openIssues: "",
		isOnLeave: false,
		createdAt: "2023-04-20T08:33:15.958Z",
		updatedAt: "2023-04-20T08:33:15.958Z",
		user: "64417870bc83e4becb95f97d",
	});

	// Setting data from input in the state for both the DSR data and Draft data --20-April-2023--Adarsh

	function storeData(e) {
		const value = e.target.value;
		setDsrData({
			...dsrData,
			[e.target.name]: value,
		});

		setDraftData({
			...draftData,
			[e.target.name]: value,
		});
	}

	// Handle data post for new DSR to API

	const handlePost = (event) => {
		event.preventDefault();

		fetch("https://new-web-app.onrender.com/add_dsr/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dsrData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		// If user submitted the DSR successfully then the below code will empty the Drafts State
		setDraftData("");
	};

	//End of Posting New DSR Data

	// On Leave Today Post

	// const handlePostLeave = (event) => {
	// 	event.preventDefault();

	// 	fetch("https://new-web-app.onrender.com/add_dsr/", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(dsrData),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("Success:", data);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 		});
	// };

	// function onLeave() {
	// 	console.log("working data");
	// 	setDsrData({
	// 		date: "2023-04-20T08:33:15.958Z",
	// 		projectName: "na",
	// 		clientManager: "na",
	// 		activitiesCompleted: "na",
	// 		activitiesPlanned: "na",
	// 		hoursWorked: 0,
	// 		status: "na",
	// 		comment: "na",
	// 		openIssues: "na",
	// 		isOnLeave: true,
	// 		createdAt: "2023-04-20T08:33:15.958Z",
	// 		updatedAt: "2023-04-20T08:33:15.958Z",
	// 		user: "643e6ecec87371d7c31ec245",
	// 	});

	// 	handlePostLeave();
	// }

	// End of leave today post

	// Draft Code

	// Getting data from input in the state

	// Handle data post to API for Drafts

	const handleDraft = (event) => {
		event.preventDefault();

		fetch("https://new-web-app.onrender.com/add_draft/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(draftData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		// If user submitted the Drafts instead of DSR then the below code will empty the DSR State

		setDsrData("");
	};

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<div className="new-dsr">
				<button className="btn btn-dark btn-error">On Leave</button>

				<div className="uid-date">
					<p className="para uid-date">
						UID: <span>000</span>
					</p>
					<p className="para">18/04/2023</p>
				</div>

				<div className="form">
					<form className="form login-form">
						<div className="input-row">
							<input
								type="text"
								placeholder="Project Name"
								id="project-name"
								name="projectName"
								onChange={storeData}
							/>

							<input
								type="text"
								placeholder="Client Manager Name"
								id="client-manager-name"
								name="clientManager"
								onChange={storeData}
							/>
						</div>

						<div className="input-row">
							<input
								type="number"
								placeholder="Hours Worked"
								id="hours-worked"
								name="hoursWorked"
								onChange={storeData}
							/>

							<input
								type="text"
								placeholder="Project Status"
								id="status"
								name="status"
								onChange={storeData}
							/>
						</div>

						<div className="input-row">
							<textarea
								type="text"
								placeholder="Activities completed Today"
								id="activities-today"
								name="activitiesCompleted"
								onChange={storeData}
							/>

							<textarea
								type="text"
								placeholder="Activities planned for tomorrow"
								id="activities-tomorrow"
								name="activitiesPlanned"
								onChange={storeData}
							/>
						</div>

						<div className="input-row">
							<textarea
								id="open-issues"
								placeholder="Open Issues"
								name="openIssues"
								onChange={storeData}
							/>

							<textarea
								id="comment"
								placeholder="Any Other Comments"
								name="comment"
								onChange={storeData}
							/>
						</div>

						<div className="input-row">
							<button
								type="submit"
								className="btn btn-dark"
								onClick={handlePost}
							>
								Submit
							</button>

							<button
								type="submit"
								className="btn btn-dark"
								onClick={handleDraft}
							>
								Save as Draft
							</button>

							<button type="submit" className="btn btn-dark">
								Clear
							</button>
						</div>
					</form>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default NewDsr;
