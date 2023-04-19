import React from "react";

function ThemeToggle({ themeSwitch }) {
	return (
		<div className="toggle-bx">
			<input
				id="toggle"
				type="checkbox"
				className="toggle modeSwitch"
				onClick={themeSwitch}
			/>
			<label htmlFor="toggle" className="toggle-label"></label>
		</div>
	);
}

export default ThemeToggle;
