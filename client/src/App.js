import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/sass/main.css";
import Dashboard from "./parts/Dashboard/Dashboard";
import NewDsr from "./routes/NewDsr/NewDsr";
import WeeklyDsr from "./routes/WeeklyDsr/WeeklyDsr";
import Drafts from "./routes/Drafts/Drafts";
import Login from "./routes/Login/Login";

function App() {
	// Theme Switching
	const [theme, setTheme] = useState(false);

	function themeSwitch() {
		const newTheme = !theme;
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
		console.log(theme);
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

	return (
		<Routes>
			<Route path="/login" element={<Login />} />

			<Route
				path="/"
				element={
					<Dashboard
						theme={theme}
						setTheme={setTheme}
						themeSwitch={themeSwitch}
					/>
				}
			>
				<Route index element={<NewDsr />} />
				<Route path="recents" element={<WeeklyDsr />} />
				<Route path="drafts" element={<Drafts />} />
			</Route>

			{/* <Route path="/*" element={<ErrorPage />} /> */}
		</Routes>
	);
}

export default App;
