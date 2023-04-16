import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

function Dashboard() {
	return (
		<div className="dashboard">
			<Sidebar />

			<section className="main-content">
				<Topbar />

				<div className="container">
					<Outlet />
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
