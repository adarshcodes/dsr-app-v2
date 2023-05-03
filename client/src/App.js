import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./assets/sass/main.css";
import Dashboard from "./parts/Dashboard/Dashboard";
import NewDsr from "./routes/NewDsr/NewDsr";
import WeeklyDsr from "./routes/WeeklyDsr/WeeklyDsr";
import Drafts from "./routes/Drafts/Drafts";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";

function App() {
	// Authentication

	// Theme Switching
	const [userdata, setUserData] = useState();
	const [theme, setTheme] = useState(false);

	function themeSwitch() {
		const newTheme = !theme;
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
	}

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setTheme(true);
		} else {
			document.documentElement.classList.remove("dark");
			setTheme(false);
		}
	}, [theme]);

	function PrivateRoute({ element }) {
		const user = localStorage.getItem("usercred");
		setUserData(user);
		if (userdata) {
			return element;
		}
	}

	return (
		<Routes>
			<>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</>
			<Route
				path="/"
				element={
					<PrivateRoute
						element={
							<Dashboard
								theme={theme}
								setTheme={setTheme}
								themeSwitch={themeSwitch}
							/>
						}
					/>
				}
			>
				<Route path="/" element={<NewDsr />} />
				<Route path="/recents" element={<WeeklyDsr />} />
				<Route path="/drafts" element={<Drafts />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
