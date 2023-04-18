import React from "react";

function Button({ value, varient, customClass, icon }) {
	return (
		<div className={`btn ${varient === "dark" ? "btn-dark customClass" : ""}`}>
			{icon}

			{value}
		</div>
	);
}

export default Button;
