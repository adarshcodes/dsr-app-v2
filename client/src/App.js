import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/sass/main.css";
import Dashboard from "./parts/Dashboard/Dashboard";
import NewDsr from "./routes/NewDsr/NewDsr";
import WeeklyDsr from "./routes/WeeklyDsr/WeeklyDsr";
import Drafts from "./routes/Drafts/Drafts";
import Login from "./routes/Login/Login";

function App() {
	// Theme Switching
	const [theme, setTheme] = React.useState(false);

	function themeSwitch() {
		setTheme(!theme);
	}

	useEffect(() => {
		if (theme) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
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
