import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/logo.svg";

const tabs = [
	{
		id: 0,
		icon: <i className="fa-solid fa-file-circle-plus"></i>,
		tab: "New DSR",
		route: "/",
	},

	{
		id: 1,
		icon: <i className="fa-solid fa-calendar-week"></i>,
		tab: "Recents",
		route: "/recents",
	},

	{
		id: 2,
		icon: <i className="fa-brands fa-firstdraft"></i>,
		tab: "Drafts",
		route: "/drafts",
	},
];

function Sidebar({ location, ham }) {
	const routeTab = tabs.map((data) => {
		return (
			<li
				className={`route-list__items ${
					data.route === location.pathname ? "active" : null
				}`}
				key={data.id}
			>
				<Link to={data.route} className="route-link">
					{data.icon}
					{data.tab}
				</Link>
			</li>
		);
	});

	return (
		<div className={`sidebar ${ham ? "show-sidebar" : ""}`}>
			<div className="sidebar__logo">
				<img src={Logo} alt="logo" className="logo" />
			</div>

			<div className="sidebar__tabs">
				<ul className="route-list">{routeTab}</ul>
			</div>
		</div>
	);
}

export default Sidebar;
