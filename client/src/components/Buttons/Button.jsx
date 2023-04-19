import React from "react";

function Button({ value, varient, customClass, icon }) {
	return (
		<div
			className={`btn ${
				varient === "btn-light" ? "btn-light" : "btn-dark"
			} ${customClass}`}
		>
			{icon && <img src={icon} alt="ms icon" />}

			<p>{value}</p>
		</div>
	);
}

export default Button;
