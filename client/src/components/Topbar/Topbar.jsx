import React from "react";

function Topbar({ ham, setHam }) {
	return (
		<div className="topbar">
			<div className="greet">
				<div className="ham">
					<label htmlFor="ham-click" id="ham">
						<div class="menu-icons">
							<div class="line line1"></div>
							<div class="line line2"></div>
							<div class="line line3"></div>
						</div>
					</label>
				</div>

				<h4 className="heading-tiny">
					Good Morning <span className="highlight">Adarsh!</span>
				</h4>
			</div>
		</div>
	);
}

export default Topbar;
