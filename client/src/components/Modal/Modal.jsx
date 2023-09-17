import React from "react";

function Modal({ btnValue, action, hideModal, modalHead, state, draftId }) {
	return (
		<div className={`modal ${state ? "show-modal" : ""}`}>
			<div className="modal-card">
				<h3 className="heading-s">{modalHead}</h3>

				<div className="ctas">
					<button
						className="btn btn-dark btn-error"
						style={{background : `${btnValue === "Submit DSR" ? "#018171" : ""}`}}
						onClick={(e) => action(draftId)}
					>
						{btnValue}
					</button>
					<button className="btn btn-dark" onClick={(e) => hideModal()} style={{background : `${btnValue === "Submit DSR" ? "#fff" : ""}`, color: `${btnValue === "Submit DSR" ? "#222" : ""}`}}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
