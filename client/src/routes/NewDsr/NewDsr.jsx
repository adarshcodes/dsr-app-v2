import React, { useState, useEffect, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedComponent from "../../AnimatedComponent";
import Modal from "../../components/Modal/Modal";
import { takeData, transferData } from "../../parts/Dashboard/Dashboard";
import NewDsrSkeleton from "../../components/Skeleton/NewDsrSkeleton";
import Dropdown from "../../components/Dropdown/Dropdown";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/*
Written the Code of NewDSR and made it responsive --- Ayush
*/

function NewDsr() {
	// adding a loading part which renders if api is slows down
	const [loading, setLoading] = useState(true);

	// Checking today's status of dsr(if already dsr is added the we will show edit option and remove form and leave button | if leave status is returned then it will show that you are on leave and if neither it returns leave nor dsr filled then will will show the form as well as Leave button) --Adarsh-25-apr-2023
	const [isLeave, setIsLeave] = useState("");

	//draft value is receiving from the drafts.jsx for
	const { draftValue } = useContext(transferData);
	const { isUse, setIsUse } = useContext(takeData);

	const fetchStatus = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"https://new-web-app.onrender.com/todaystatus",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: JSON.parse(localStorage.getItem("usercred")).id,
					}),
				}
			);
			const data = await response.json();
			setIsLeave(data);
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchStatus();
	}, []);

	// Posting New DSR Data --Adarsh-20-April-2023
	// Creating state to get data from the inputs onChange --Adarsh-20-April-2023

	// Generating current date in readable format
	const dateTime = new Date();

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
		projectName: "",
		clientManager: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
		hoursWorked: "",
		status: "",
		comment: "",
		openIssues: "",
		isOnLeave: false,
		user: JSON.parse(localStorage.getItem("usercred")).id,
	});

	// Setting data from input in the state for both the DSR data and Draft data --20-April-2023--Adarsh

	function storeData(e) {
		const name = e.target.name;
		let value = e.target.value;

		if (name === "hoursWorked") {
			// Remove any non-digit characters
			value = value.replace(/[^\d.]/g, "");

			// Limit to a range between 1 and 15
			if (value < 0) {
				value = "";
			} else if (value > 12) {
				value = 12;
			}
		}

		setDsrData({
			...dsrData,
			[e.target.name]: value,
		});

		setDraftData({
			...draftData,
			[e.target.name]: value,
		});

		setErrors({
			...errors,
			[e.target.name]: "",
		});
	}

	// Handle Quill data change
	const handleQuillChange = (name, value) => {
		setDsrData((prevDsrData) => ({
			...prevDsrData,
			[name]: value,
		}));

		setErrors({
			...errors,
			[name]: "",
		});
	};

	// Handle Quill Edit
	const handleQuillEdit = (name, value) => {
		setLastDsr((prevDsrData) => ({
			...prevDsrData,
			[name]: value,
		}));
	};

	//changing the state of dsrData if draftValue exist :------Ayush

	useEffect(() => {
		isUse &&
			draftValue &&
			setDsrData({
				projectName: draftValue.projectName,
				clientManager: draftValue.clientManager,
				activitiesCompleted: draftValue.activitiesCompleted,
				activitiesPlanned: draftValue.activitiesPlanned,
				hoursWorked: draftValue.hoursWorked,
				status: draftValue.status,
				comment: draftValue.comment,
				openIssues: draftValue.openIssues,
				isOnLeave: false,
				user: JSON.parse(localStorage.getItem("usercred")).id,
			});
	}, [isUse, draftValue]);

	// --Handle data post for new DSR to API--
	const handlePost = async (event) => {
		try {
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
			handleClear();
			setMsgToShow("DSR-Saved");
			data.errors ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 2500);
			await fetchLastDsr();
			await fetchStatus();
		} catch (error) {
			setMsgToShow("DSR-Not-Saved");
			errorMsg();
			setTimeout(closeMsg, 2500);
			console.log(error);
		}
	};

	function handleSubmit(event) {
		event.preventDefault();
		if (validateForm()) {
			handlePost(event);
		}
	}

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

		setErrors({
			...errors,
			projectName: "",
			clientManager: "",
			activitiesCompleted: "",
			activitiesPlanned: "",
			hoursWorked: "",
			status: "",
		});
		setSelectedOption("Project health");

		setIsUse(false);
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
		projectName: "",
		clientManager: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
		hoursWorked: "",
		status: "",
		comment: "",
		openIssues: "",
		isOnLeave: false,
		user: JSON.parse(localStorage.getItem("usercred")).id,
	});

	// Handle Draft Save
	const handleDraft = async (event) => {
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
			handleClear();
			setMsgToShow("Draft-Saved");
			data.errors ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 2500);
		} catch (error) {
			setMsgToShow("Draft-Not-Saved");
			errorMsg();
			setTimeout(closeMsg, 2500);
		}
	};

	// handling leave mark
	async function handleLeave() {
		try {
			const deletedData = await markLeave();
			await fetchStatus();
			return deletedData;
		} catch (error) {
			console.error("Error:", error);
		}
	}

	const markLeave = async () => {
		try {
			const response = await fetch("https://new-web-app.onrender.com/onleave", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: JSON.parse(localStorage.getItem("usercred")).id,
				}),
			});

			const data = await response.json();
			setMsgToShow("Marked-Leave");
			!data ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 2500);
		} catch (error) {
			setMsgToShow("Unmarked-Leave");
			errorMsg();
			setTimeout(closeMsg, 2500);
		}

		setModal(false);
	};

	function handleLeaveBtn() {
		hideModal();
		handleLeave();
	}

	// Shows Modal
	const [modal, setModal] = useState(false);

	useEffect(() => {
		const container = document.querySelector(".container");
		modal
			? container.classList.add("remove-scroll")
			: container.classList.remove("remove-scroll");
	}, [modal]);

	function showModal() {
		setModal(true);
	}

	function hideModal() {
		setModal(false);
	}

	// Form Validation
	const [errors, setErrors] = useState({
		projectName: "",
		clientManager: "",
		hoursWorked: "",
		status: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
	});

	const validateForm = () => {
		let isValid = true;

		const newErrors = {
			projectName: "",
			clientManager: "",
			hoursWorked: "",
			status: "",
			activitiesCompleted: "",
			activitiesPlanned: "",
		};

		if (!dsrData.projectName) {
			newErrors.projectName = "Project Name is required.";
			isValid = false;
		}

		if (!dsrData.clientManager) {
			newErrors.clientManager = "Project Manager Name is required.";
			isValid = false;
		}

		if (!dsrData.hoursWorked) {
			newErrors.hoursWorked = "Hours Worked is required.";
			isValid = false;
		} else if (dsrData.hoursWorked < 0) {
			newErrors.hoursWorked = "Hours Worked must be a positive number.";
			isValid = false;
		}

		if (!dsrData.status) {
			newErrors.status = "Project Status is required.";
			isValid = false;
		}

		if (!dsrData.activitiesCompleted) {
			newErrors.activitiesCompleted = "Activities completed today is required.";
			isValid = false;
		}

		if (!dsrData.activitiesPlanned) {
			newErrors.activitiesPlanned =
				"Activities planned for tomorrow is required.";
			isValid = false;
		}

		setErrors(newErrors);

		return isValid;
	};

	// Updating DSR
	const [lastDsr, setLastDsr] = useState({
		_id: "",
		projectName: "",
		clientManager: "",
		activitiesCompleted: "",
		activitiesPlanned: "",
		hoursWorked: "",
		status: "",
		comment: "",
		openIssues: "",
	});

	const [isUpdated, setIsUpdated] = useState(false);

	const fetchLastDsr = async (event) => {
		// event.preventDefault();
		try {
			const response = await fetch("https://new-web-app.onrender.com/lastdsr", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: JSON.parse(localStorage.getItem("usercred")).id,
				}),
			});

			const data = await response.json();
			setLastDsr(data);
			setIsUpdated(data.isupdated);
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchLastDsr();
	}, []);

	const saveUpdate = async () => {
		try {
			const response = await fetch(
				"https://new-web-app.onrender.com/saveupdate",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(lastDsr),
				}
			);

			const data = await response.json();
			setLastDsr(data);
			setMsgToShow("Updated-Dsr");
			!data.isupdated ? errMsg() : verificationMsg();
			setTimeout(closeMsg, 2500);
		} catch (error) {
			setMsgToShow("Noupdated-Dsr");
			errorMsg();
			setTimeout(closeMsg, 2500);
		}
	};

	function handleEdit(e) {
		const name = e.target.name;
		let value = e.target.value;

		if (name === "hoursWorked") {
			// Remove any non-digit characters
			value = value.replace(/\D/g, "");

			// Limit to a range between 1 and 15
			if (value < 1) {
				value = 1;
			} else if (value > 12) {
				value = 12;
			}
		}

		setLastDsr({
			...lastDsr,
			[e.target.name]: value,
		});
	}

	const handleOptionEdit = (option) => {
		setSelectedOption(option.label);
		setIsOpen(false);

		setLastDsr({
			...lastDsr,
			status: option.label,
		});
	};

	const [isEditable, setIsEditable] = useState(false);

	function editDsr() {
		setIsEditable(true);
	}

	function updateDsr() {
		setIsEditable(false);
		setIsUpdated(true);
		saveUpdate();
	}

	// Custom Dropdown
	const [selectedOption, setSelectedOption] = useState("Project health");
	const [isOpen, setIsOpen] = useState(false);
	const options = [
		{ label: "Green", color: "#00cc00" },
		{ label: "Orange", color: "#FFBF00" },
		{ label: "Red", color: "#ff0000" },
	];

	const handleOptionClick = (option) => {
		setSelectedOption(option.label);
		setIsOpen(false);

		setDsrData({
			...dsrData,
			status: option.label,
		});

		setDraftData({
			...draftData,
			status: option.label,
		});
	};

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<HelmetProvider>
			<AnimatedComponent>
				<Helmet>
					<title>Create New DSR | LeafLog-Quadrafort</title>
				</Helmet>
				<div className="container-box">
					{loading && <NewDsrSkeleton />}

					{isLeave === 0 && (
						<div className="new-dsr">
							{/* Notification Messages */}
							<div
								className={`verification-cta ${msg ? "show-verification" : ""}`}
							>
								<h3 className="heading-xs">
									{msgToShow === "DSR-Saved" &&
										"DSR successfully Submitted! 🎉"}
									{msgToShow === "Draft-Saved" && "Draft saved successfully!🎉"}
									{msgToShow === "Marked-Leave" && "Leave Marked for today! 🎉"}
									{msgToShow === "Updated-Dsr" &&
										"DSR is updated successfully! 🎉"}
								</h3>
							</div>

							<div
								className={`verification-cta error-cta ${
									errMsg ? "show-verification" : ""
								}`}
							>
								<h3 className="heading-xs">
									{msgToShow === "DSR-Not-Saved" &&
										"DSR was not Saved! We are experiencing some problems! 💀"}
									{msgToShow === "Draft-Not-Saved" &&
										"Draft was not Saved! We are experiencing some problems! 💀"}
									{msgToShow === "Unmarked-Leave" &&
										"Unable to mark leave due to some internal issues! 💀"}
									{msgToShow === "Noupdated-Dsr" &&
										"Unable to edit DSR due to some internal issues! 💀"}
								</h3>
							</div>

							{/* Modal confirmation */}
							<Modal
								btnValue={"Mark Leave"}
								modalHead={"Are you sure to mark leave today?"}
								action={handleLeaveBtn}
								state={modal}
								setState={setModal}
								hideModal={hideModal}
							/>

							<button
								className="btn btn-dark btn-error"
								onClick={(e) => showModal()}
							>
								On Leave
							</button>

							<div className="new-dsr-card">
								<div className="uid-date">
									<h3 className="heading-s">Please Fill Your DSR!</h3>
									<p className="para">
										Date: <span>{currentDate}</span>
									</p>
								</div>

								<form className="form login-form">
									<div className="input-row">
										<div className="input__group">
											<input
												type="text"
												id="project-name"
												name="projectName"
												onChange={storeData}
												className={`form__input form-input ${
													errors.projectName ? "invalid-input" : "valid-input"
												}`}
												value={dsrData.projectName}
											/>

											<label
												htmlFor="project-name"
												className="input__label input-label"
											>
												Project Name <sup style={{ color: `red` }}>*</sup>
											</label>

											{errors.projectName && (
												<div className="validation-error">
													{errors.projectName}
												</div>
											)}
										</div>

										<div className="input__group">
											<input
												type="text"
												id="client-manager-name"
												name="clientManager"
												onChange={storeData}
												className={`form__input form-input ${
													errors.clientManager ? "invalid-input" : "valid-input"
												}`}
												value={dsrData.clientManager}
											/>

											<label
												htmlFor="client-manager-name"
												className="input__label input-label"
											>
												Project Manager Name{" "}
												<sup style={{ color: `red` }}>*</sup>
											</label>

											{errors.clientManager && (
												<div className="validation-error">
													{errors.clientManager}
												</div>
											)}
										</div>
									</div>

									<div className="input-row">
										<div className="input__group input__group__area">
											<ReactQuill
												value={dsrData.activitiesCompleted}
												onChange={(value) =>
													handleQuillChange("activitiesCompleted", value)
												}
											/>

											<label
												htmlFor="activities-today"
												className="input__label input__label__area input-label"
											>
												Activities completed Today{" "}
												<sup style={{ color: "red" }}>*</sup>
											</label>

											{errors.activitiesCompleted && (
												<div className="validation-error textarea-error">
													{errors.activitiesCompleted}
												</div>
											)}
										</div>

										<div className="input__group input__group__area">
											<ReactQuill
												value={dsrData.activitiesPlanned}
												onChange={(value) =>
													handleQuillChange("activitiesPlanned", value)
												}
											/>

											<label
												htmlFor="activities-tomorrow"
												className="input__label input__label__area input-label"
											>
												Activities planned for tomorrow{" "}
												<sup style={{ color: "red" }}>*</sup>
											</label>

											{errors.activitiesPlanned && (
												<div className="validation-error textarea-error">
													{errors.activitiesPlanned}
												</div>
											)}
										</div>
									</div>

									<div className="input-row">
										<div className="input__group-box">
											<div className="input__group">
												<input
													type="number"
													inputMode="numeric"
													id="hours-worked"
													name="hoursWorked"
													onChange={storeData}
													className={`form__input form-input ${
														errors.hoursWorked ? "invalid-input" : "valid-input"
													}`}
													min="1"
													max="12"
													value={dsrData.hoursWorked}
												/>

												<label
													htmlFor="hours-worked"
													className="input__label input-label"
												>
													Hours Worked <sup style={{ color: "red" }}>*</sup>
												</label>

												{errors.hoursWorked && (
													<div className="validation-error">
														{errors.hoursWorked}
													</div>
												)}
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

												<label
													htmlFor="health"
													className="input__label input__label__area input-label"
												>
													Select Project Health <sup>&nbsp;</sup>
												</label>
											</div>
										</div>

										<div className="input__group input__group__area">
											<textarea
												id="open-issues"
												name="openIssues"
												onChange={storeData}
												className={`form__input form-input`}
												value={dsrData.openIssues}
											/>

											<label
												htmlFor="open-issues"
												className="input__label input__label__area input-label"
											>
												Open Issues for today <sup>&nbsp;</sup>
											</label>
										</div>
									</div>

									<div className="input-row">
										<div className="input__group input__group__area">
											<textarea
												id="comment"
												name="comment"
												onChange={storeData}
												className={`form__input form-input`}
												value={dsrData.comment}
											/>
											<label
												htmlFor="comment"
												className="input__label input__label__area input-label"
											>
												Any other comments
											</label>
										</div>
									</div>

									<div className="input-row btn-row">
										<button
											type="submit"
											className="btn btn-dark"
											onClick={handleSubmit}
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
					)}

					{isLeave === 1 && (
						<div className="blank-container card-container edit-card">
							<div className="blank-page dsr-edit-page">
								<h1 className="heading-m">
									<i className="fa-solid fa-person-hiking"></i>

									<br />
									{`${
										!isUpdated
											? "You've already filled the DSR. Do you want to edit?"
											: "You've already edited the DSR. You can't edit again!"
									}`}
								</h1>

								<div className="preview-edit">
									<h4 className="heading-s">Your last DSR</h4>
									<div className="preview-card">
										<div className="edit-input-row">
											<label htmlFor="project-edit">Project name:</label>
											<input
												type="text"
												name="projectName"
												id="project-edit"
												value={lastDsr.projectName}
												onChange={handleEdit}
												readOnly={!isEditable}
												className={`${!isEditable ? "non-editable" : ""}`}
											/>
										</div>

										<div className="edit-input-row">
											<label htmlFor="manager-edit">
												Project manager name:
											</label>
											<input
												type="text"
												name="clientManager"
												id="manager-edit"
												value={lastDsr.clientManager}
												onChange={handleEdit}
												readOnly={!isEditable}
												className={`${!isEditable ? "non-editable" : ""}`}
											/>
										</div>

										<div className="edit-input-row">
											<label htmlFor="hours-edit">Hours worked:</label>
											<input
												type="number"
												name="hoursWorked"
												id="hours-edit"
												value={lastDsr.hoursWorked}
												onChange={handleEdit}
												readOnly={!isEditable}
												className={`${!isEditable ? "non-editable" : ""}`}
											/>
										</div>

										<div className="edit-input-row">
											<label htmlFor="status-edit">Project Health:</label>

											{isEditable ? (
												<Dropdown
													selectedOption={selectedOption}
													isOpen={isOpen}
													setIsOpen={setIsOpen}
													options={options}
													handleOptionClick={handleOptionEdit}
													id="health"
												/>
											) : (
												<input
													type="text"
													name="status"
													id="status-edit"
													value={lastDsr.status}
													onChange={handleEdit}
													readOnly={!isEditable}
													className={`${!isEditable ? "non-editable" : ""}`}
												/>
											)}
										</div>

										<div className="edit-input-row">
											<label htmlFor="activity-edit">
												Activities completed today:
											</label>

											{isEditable ? (
												<ReactQuill
													value={lastDsr.activitiesCompleted}
													onChange={(value) =>
														handleQuillEdit("activitiesCompleted", value)
													}
													modules={{ toolbar: true }}
												/>
											) : (
												<div
													className="rte non-editable"
													dangerouslySetInnerHTML={{
														__html: lastDsr.activitiesCompleted,
													}}
												></div>
											)}
										</div>

										<div className="edit-input-row">
											<label htmlFor="activity-planned-edit">
												Activities planned for tomorrow:
											</label>

											{isEditable ? (
												<ReactQuill
													value={lastDsr.activitiesPlanned}
													onChange={(value) =>
														handleQuillEdit("activitiesPlanned", value)
													}
													modules={{ toolbar: true }}
												/>
											) : (
												<div
													className="rte non-editable"
													dangerouslySetInnerHTML={{
														__html: lastDsr.activitiesPlanned,
													}}
												></div>
											)}
										</div>

										<div className="edit-input-row">
											<label htmlFor="issues-edit">Open issues:</label>
											<textarea
												name="openIssues"
												id="issues-edit"
												value={lastDsr.openIssues}
												onChange={handleEdit}
												readOnly={!isEditable}
												className={`${!isEditable ? "non-editable" : ""}`}
											></textarea>
										</div>

										<div className="edit-input-row">
											<label htmlFor="comment-edit">Any other comment:</label>
											<textarea
												name="comment"
												id="comment-edit"
												value={lastDsr.comment}
												onChange={handleEdit}
												readOnly={!isEditable}
												className={`${!isEditable ? "non-editable" : ""}`}
											></textarea>
										</div>
									</div>
									{!isUpdated ? (
										!isEditable ? (
											<button
												className="btn btn-dark btn-edit"
												onClick={(e) => editDsr()}
											>
												Edit
											</button>
										) : (
											<button
												className="btn btn-dark btn-edit"
												onClick={(e) => updateDsr()}
											>
												Update
											</button>
										)
									) : (
										""
									)}

									{!isUpdated ? (
										<p className="para warning-cta">
											Once you edit the DSR, you won't be able to edit again!
										</p>
									) : (
										""
									)}
								</div>
							</div>
						</div>
					)}

					{isLeave === 2 && (
						<div className="blank-container card-container">
							<div
								className={`verification-cta error-cta ${
									errMsg ? "show-verification" : ""
								}`}
							>
								<h3 className="heading-xs">
									{msgToShow === "DSR-Not-Saved" &&
										"DSR was not Saved! We are experiencing some problems! 💀"}
									{msgToShow === "Draft-Not-Saved" &&
										"Draft was not Saved! We are experiencing some problems! 💀"}
									{msgToShow === "Unmarked-Leave" &&
										"Unable to mark leave due to some internal issues! 💀"}
									{msgToShow === "Noupdated-Dsr" &&
										"Unable to edit DSR due to some internal issues! 💀"}
								</h3>
							</div>

							<div className="blank-page">
								<h1 className="heading-m">
									<i className="fa-solid fa-person-hiking"></i>
									<br />
									You've already marked the DSR as Leave! <br />
									You can only fill your DSR Tomorrow. <br /> Enjoy Your Day!
								</h1>
							</div>
						</div>
					)}

					{isLeave === 3 && (
						<div className="blank-container card-container">
							<div className="blank-page">
								<h1 className="heading-m">
									<i className="fa-solid fa-server"></i>
									<br />
									DSR was removed by Admin! Please contact your Manager!
								</h1>
							</div>
						</div>
					)}
				</div>
			</AnimatedComponent>
		</HelmetProvider>
	);
}

export default NewDsr;
