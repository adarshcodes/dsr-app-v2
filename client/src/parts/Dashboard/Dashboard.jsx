import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

function Dashboard({ theme, themeSwitch }) {
	const location = useLocation();
	const [ham, setHam] = useState(false);
	const [useDraft, setUseDraft] = React.useState({});

	return (
		<div className="dashboard">
			<Sidebar location={location} theme={theme} ham={ham} setHam={setHam} />

			<section className="main-content">
				<Topbar ham={ham} setHam={setHam} themeSwitch={themeSwitch} />

				<div className="container">
					<Outlet context={[useDraft, setUseDraft]} />
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
