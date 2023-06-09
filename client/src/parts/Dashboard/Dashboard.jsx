import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

function Dashboard({ theme }) {
	const location = useLocation();
	const [ham, setHam] = useState(false);

	return (
		<div className="dashboard">
			<Sidebar location={location} theme={theme} ham={ham} setHam={setHam} />

			<section className="main-content">
				<Topbar ham={ham} setHam={setHam} />

				<div className="container">
					<Outlet />
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
