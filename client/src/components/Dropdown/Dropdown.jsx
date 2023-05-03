import React from "react";

const Dropdown = ({
	selectedOption,
	isOpen,
	setIsOpen,
	options,
	handleOptionClick,
}) => {
	return (
		<div className="dropdown">
			<div
				className={`dropdown-toggle ${isOpen ? "active" : ""}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption}
				{selectedOption !== "Project health" && (
					<div
						className="selected-color"
						style={{
							backgroundColor: options.find((o) => o.label === selectedOption)
								.color,
						}}
					/>
				)}
				<div className="arrow" />
			</div>
			{isOpen && (
				<ul className="dropdown-menu">
					{options.map((option) => (
						<li
							key={option.label}
							className="dropdown-item"
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
							<div
								className="color-circle"
								style={{ backgroundColor: option.color }}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
