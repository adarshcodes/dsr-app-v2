import React, { useState } from "react";
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
		hoursWorked: "",
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
		const dateTime = new Date();

		setDsrData({
			...dsrData,
			[e.target.name]: value,
			date: dateTime,
			createdAt: dateTime,
			updatedAt: dateTime,
		});
	}

	// --Handle data post for new DSR to API--
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
		// setDraftData("");

		// Clearing form after Submission
		handleClear();
	};
	// --End of Posting New DSR Data--

	// Clearing the input
	const handleClear = () => {
		console.log("working clear");
		setDsrData({
			...dsrData,
			projectName: "",
			clientManager: "",
			activitiesCompleted: "",
			activitiesPlanned: "",
			hoursWorked: "",
			status: "",
			comment: "",
			openIssues: "",
		});
	};

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<div className="new-dsr">
				<button className="btn btn-dark btn-error">On Leave</button>

				<div className="new-dsr-card">
					<div className="uid-date">
						<p className="para uid-date">
							UID: <span>000</span>
						</p>
						<p className="para">18/04/2023</p>
					</div>

					<div className="form">
						<form className="form login-form">
							<div className="input-row">
								<div className="input__group">
									<input
										type="text"
										placeholder="Project Name"
										id="project-name"
										name="projectName"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.projectName}
									/>

									<label
										htmlFor="project-name"
										className="input__label input-label"
									>
										Project Name <sup style={{ color: `red` }}>*</sup>
									</label>
								</div>

								<div className="input__group">
									<input
										type="text"
										placeholder="Client Manager Name"
										id="client-manager-name"
										name="clientManager"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.clientManager}
									/>

									<label
										htmlFor="client-manager-name"
										className="input__label input-label"
									>
										Client Manager Name <sup style={{ color: `red` }}>*</sup>
									</label>
								</div>
							</div>

							<div className="input-row">
								<div className="input__group">
									<input
										type="number"
										placeholder="Hours Worked"
										id="hours-worked"
										name="hoursWorked"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.hoursWorked}
									/>

									<label
										htmlFor="hours-worked"
										className="input__label input-label"
									>
										Hours Worked <sup style={{ color: "red" }}>*</sup>
									</label>
								</div>

								<div className="input__group">
									<input
										type="text"
										placeholder="Project Status"
										id="status"
										name="status"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.status}
									/>

									<label htmlFor="status" className="input__label input-label">
										Project Status <sup style={{ color: "red" }}>*</sup>
									</label>
								</div>
							</div>

							<div className="input-row">
								<div className="input__group">
									<textarea
										type="text"
										placeholder="Activities completed Today"
										id="activities-today"
										name="activitiesCompleted"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.activitiesCompleted}
									/>

									<label
										htmlFor="activities-today"
										className="input__label input__label__area input-label"
									>
										Activities completed Today{" "}
										<sup style={{ color: "red" }}>*</sup>
									</label>
								</div>

								<div className="input__group">
									<textarea
										type="text"
										placeholder="Activities planned for tomorrow"
										id="activities-tomorrow"
										name="activitiesPlanned"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.activitiesPlanned}
									/>

									<label
										htmlFor="activities-tomorrow"
										className="input__label input__label__area input-label"
									>
										Activities planned for tomorrow{" "}
										<sup style={{ color: "red" }}>*</sup>
									</label>
								</div>
							</div>

							<div className="input-row">
								<div className="input__group">
									<textarea
										id="open-issues"
										placeholder="Open Issues"
										name="openIssues"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.openIssues}
									/>

									<label
										htmlFor="open-issues"
										className="input__label input__label__area input-label"
									>
										Open Issues <sup style={{ color: "red" }}>*</sup>
									</label>
								</div>

								<div className="input__group">
									<textarea
										id="comment"
										placeholder="Any Other Comments"
										name="comment"
										onChange={storeData}
										className="form__input form-input"
										value={dsrData.comment}
									/>

									<label
										htmlFor="comment"
										className="input__label input__label__area input-label"
									>
										Any Other Comments <sup style={{ color: "red" }}>*</sup>
									</label>
								</div>
							</div>

							<div className="input-row btn-row">
								<button
									type="submit"
									className="btn btn-dark"
									onClick={handlePost}
								>
									Submit
								</button>

								<button
									className="btn btn-dark"
									type="button"
									// onClick={handleDraft}
								>
									Save as Draft
								</button>

								<button
									type="button"
									className="btn btn-dark"
									onClick={handleClear}
								>
									Clear
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default NewDsr;
