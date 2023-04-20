import React, { useState } from "react";
import AnimatedComponent from "../../AnimatedComponent";
import Button from "../../components/Buttons/Button";

function WeeklyDsr() {
	// Adding animated component to make the route change animated -- Adarsh(19-Apr)

	const [recents, setRecents] = useState([
		{
			id: 0,
			date: "20-April-2023",
			projectName: "DSR Web App",
			clientManager: "Rohit Maurya",
			hoursWorked: 8,
			status: "Green",
			activitiesCompleted:
				"Completed Login Page. Worked on the the new dsr page. Created Top bar. Added dark mode.",
			activitiesPlannned:
				"Complete Recents page. Redesign UI. Complete DSR Drafts",
			openIssues: "",
			comment: "",
		},
		{
			id: 1,
			date: "19-April-2023",
			projectName: "DSR Web App",
			clientManager: "Rohit Maurya",
			hrsWorked: 8,
			projectHealth: "Blue",
			activitiesCompleted:
				"Completed Login Page. Worked on the the new dsr page. Created Top bar. Added dark mode.",
			activitiesPlannned:
				"Complete Recents page. Redesign UI. Complete DSR Drafts",
			openIssues: "",
			comment: "",
		},
		{
			id: 2,
			date: "18-April-2023",
			projectName: "DSR Web App",
			clientManager: "Rohit Maurya",
			hrsWorked: 8,
			projectHealth: "Green",
			activitiesCompleted:
				"Completed Login Page. Worked on the the new dsr page. Created Top bar. Added dark mode.",
			activitiesPlannned:
				"Complete Recents page. Redesign UI. Complete DSR Drafts",
			openIssues: "",
			comment: "",
		},
		{
			id: 3,
			date: "17-April-2023",
			projectName: "DSR Web App",
			clientManager: "Rohit Maurya",
			hrsWorked: 8,
			projectHealth: "Blue",
			activitiesCompleted:
				"Completed Login Page. Worked on the the new dsr page. Created Top bar. Added dark mode.",
			activitiesPlannned:
				"Complete Recents page. Redesign UI. Complete DSR Drafts",
			openIssues: "",
			comment: "",
		},
		{
			id: 4,
			date: "16-April-2023",
			projectName: "DSR Web App",
			clientManager: "Rohit Maurya",
			hrsWorked: 8,
			projectHealth: "Blue",
			activitiesCompleted:
				"Completed Login Page. Worked on the the new dsr page. Created Top bar. Added dark mode.",
			activitiesPlannned:
				"Complete Recents page. Redesign UI. Complete DSR Drafts",
			openIssues: "",
			comment: "",
		},
	]);

	const cardDsr = recents.map((data) => {
		return (
			<div className="recents-card card">
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
						<p className="para">{data.hrsWorked}hrs</p>
					</div>

					<div className="data client-manager">
						<h4 className="heading-xs">Client Manager</h4>
						<p className="para">{data.clientManager}</p>
					</div>
				</div>

				<div className="cta" onClick={(e) => setSlider(true)}>
					<Button value={"View"} varient={"dark"} customClass={"btn-view"} />
				</div>
			</div>
		);
	});

	const [slider, setSlider] = useState(false);

	return (
		<AnimatedComponent>
			<div className="recents">
				<h3 className="heading-s">View Your Last 5 DSR</h3>

				<div className="recents-card-container card-container">{cardDsr}</div>

				<div className={`view-slider ${slider ? "show-slider" : ""}`}>
					<div className="close-btn" onClick={(e) => setSlider(false)}>
						<i class="fa-solid fa-angle-right"></i>
					</div>

					<div className="dsr-details">
						<h3 className="heading-s dsr-title">DSR Details</h3>

						<div className="details">
							<div className="data">
								<h4 className="heading-xs">Date:</h4>
								<p className="para">20-April-2023</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Project:</h4>
								<p className="para">DSR Web App</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Client Manager:</h4>
								<p className="para">Rohit Maurya</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Hours Worked:</h4>
								<p className="para">8Hrs</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Project Health:</h4>
								<p className="para">Green</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Activities Completed:</h4>
								<p className="para">
									Completed Login Page. Worked on the the new dsr page. Created
									Top bar. Added dark mode.
								</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Activities Planned:</h4>
								<p className="para">
									Complete Recents page. Redesign UI. Complete DSR Drafts
								</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Open Issues:</h4>
								<p className="para">NA</p>
							</div>

							<div className="data">
								<h4 className="heading-xs">Comments:</h4>
								<p className="para">NA</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default WeeklyDsr;
