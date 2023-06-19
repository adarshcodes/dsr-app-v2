import React from "react";

function ThemeToggle({ themeSwitch, theme }) {
	return (
		<div className="toggle-bx">
			<input
				id="toggle"
				type="checkbox"
				className={`toggle modeSwitch ${theme ? "checked" : ""}`}
				onClick={themeSwitch}
			/>
			<label htmlFor="toggle" className="toggle-label"></label>
		</div>
	);
}

export default ThemeToggle;
