import React, { useState } from "react";
import Helmet from "react-helmet";
import AnimatedComponent from "../../AnimatedComponent";
import { useOutletContext } from "react-router-dom";

/*
  Written the Code of NewDSR and made it responsive --- Ayush
*/

function NewDsr() {
	const [isSubmitted, setIsSubmitted] = useState(false);

	function submittedDSR() {
		setIsSubmitted(true);
	}
	// Posting New DSR Data --Adarsh-20-April-2023
	// Creating state to get data from the inputs onChange --Adarsh-20-April-2023

	// Generating current date in readble format
	const dateTime = new Date();

	// Adding using Draft Feature -- Adarsh-24-april-2023
	const [useDraft, setUseDraft] = useOutletContext();

	console.log(useDraft, "This data is from Draft!");

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

	let currentDate =
		dateTime.getDate() +
		" " +
		monthArray[dateTime.getMonth()] +
		" " +
		dateTime.getFullYear();

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

		setDsrData({
			...dsrData,
			[e.target.name]: value,
			date: dateTime,
			createdAt: dateTime,
			updatedAt: dateTime,
		});

		setDraftData({
			...draftData,
			[e.target.name]: value,
			date: dateTime,
			createdAt: dateTime,
			updatedAt: dateTime,
		});
	}

	// --Handle data post for new DSR to API--
	const handlePost = async (event) => {
		setMsgToShow("DSR-Saved");
		try {
			event.preventDefault();
			const response = await fetch(
				"https://new-web-app.onrender.com/add_dsr/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dsrData),
				}
			);

			const data = await response.json();
			// Clearing form after Submission
			data.errors ? errMsg() : verificationMsg();
			handleClear();
			setTimeout(closeMsg, 2000);
			submittedDSR();
		} catch (error) {
			setMsgToShow("DSR-Not-Saved");
			errorMsg();
			setTimeout(closeMsg, 2000);
		}
	};

	// --End of Posting New DSR Data--

	// Clearing the input
	const handleClear = () => {
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

		setDraftData({
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

	// Showing notification on submit data and error
	const [msgToShow, setMsgToShow] = useState();

	const [msg, setMsg] = useState(false);
	const [errMsg, setErrMsg] = useState(false);

	function verificationMsg() {
		setMsg(true);
	}

	function errorMsg() {
		setErrMsg(true);
	}

	function closeMsg() {
		setMsg(false);
		setErrMsg(false);
	}

	// Saving Draft
	const [draftData, setDraftData] = useState({
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

	// Handle Draft Save
	const handleDraft = async (event) => {
		setMsgToShow("Draft-Saved");
		try {
			event.preventDefault();
			const response = await fetch(
				"https://new-web-app.onrender.com/add_draft/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(draftData),
				}
			);

			const data = await response.json();
			// Clearing form after Submission
			data.errors ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 2000);
			handleClear();
		} catch (error) {
			setMsgToShow("Draft-Not-Saved");
			errorMsg();
			setTimeout(closeMsg, 2000);
		}
	};

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<Helmet>
				<title>Create New DSR | LeafLog-Quadrafort</title>
			</Helmet>
			<div className="new-dsr">
				<div className={`verification-cta ${msg ? "show-verification" : ""}`}>
					<h3 className="heading-xs">
						{msgToShow === "DSR-Saved"
							? "DSR successfully Submitted! 🎉"
							: "Draft saved successfully! Find it in the Drafts Tab! 🎉"}
					</h3>
				</div>

				<div
					className={`verification-cta error-cta ${
						errMsg ? "show-verification" : ""
					}`}
				>
					<h3 className="heading-xs">
						{msgToShow === "DSR-Not-Saved"
							? "DSR was not Saved! We are experiencing some problems! 💀 🎉"
							: "Draft was not Saved! We are experiencing some problems! 💀 🎉"}
					</h3>
				</div>

				<button className="btn btn-dark btn-error">On Leave</button>

				<div className="new-dsr-card">
					<div className="uid-date">
						<h3 className="heading-s">Please Fill Your DSR!</h3>
						<p className="para">
							Date: <span>{currentDate}</span>
						</p>
						{isSubmitted ? <p>Already Filled DSR</p> : ""}
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
								<div className="input__group input__group__area">
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

								<div className="input__group input__group__area">
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
								<div className="input__group input__group__area">
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

								<div className="input__group input__group__area">
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
									className="btn btn-dark btn-warning"
									type="button"
									onClick={handleDraft}
								>
									Save as Draft
								</button>

								<button
									type="button"
									className="btn btn-dark btn-error"
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
