import React from "react";

function ButtonDark({ value, varient, customClass }) {
	return <div className={`btn btn-dark ${customClass}`}>{value}</div>;
}

export default ButtonDark;
