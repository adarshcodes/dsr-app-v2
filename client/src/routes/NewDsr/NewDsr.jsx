import React from "react";
import Button from "../../components/Buttons/Button";
import AnimatedComponent from "../../AnimatedComponent";

/*
  Written the Code of NewDSR and made it responsive --- Ayush
*/

function NewDsr() {
	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<AnimatedComponent>
			<div className="new-dsr">
				<Button value={"Leave"} varient={"dark"} customClass={"btn-leave"} />
				<div className="uid-date">
					<p className="para uid-date">
						UID <span>000</span>
					</p>
					<p className="para">18/04/2023</p>
				</div>
				<div className="form">
					<form className="form login-form">
						<div className="input-row">
							<input type="text" placeholder="Project Name" id="project-name" />
							<input
								type="text"
								placeholder="Resource Name"
								id="resource-name"
							/>
						</div>
						<div className="input-row">
							<input
								type="text"
								placeholder="Client Manager Name"
								id="client-manager-name"
							/>
							<input
								type="number"
								placeholder="Hours Worked"
								id="hours-worked"
							/>
						</div>
						<div className="input-row">
							<input
								type="text"
								placeholder="Activities completed Today"
								id="activities-today"
							/>
							<input
								type="text"
								placeholder="Activities planned for tomorrow"
								id="activities-tomorrow"
							/>
						</div>
						<div className="input-row">
							<textarea
								id="open-issues"
								placeholder="Open Issues"
								rows="4"
								minLength="0"
								cols="50"
							></textarea>
						</div>
						<div className="input-row">
							<Button value={"Submit"} varient={"dark"} />
							<Button value={"Save as Draft"} varient={"dark"} />
							<Button value={"Clear"} varient={"dark"} />
						</div>
					</form>
				</div>
			</div>
		</AnimatedComponent>
	);
}

export default NewDsr;
