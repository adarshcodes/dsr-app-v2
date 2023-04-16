import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/sass/main.css";
import User from "./routes/User/User";
import Dashboard from "./parts/Dashboard/Dashboard";
import NewDsr from "./routes/NewDsr/NewDsr";
import WeeklyDsr from "./routes/WeeklyDsr/WeeklyDsr";
import Drafts from "./routes/Drafts/Drafts";

function App() {
	// Theme Switching
	const [theme, setTheme] = React.useState(true);

	// function themeSwitch() {
	// 	setTheme(!theme);
	// }

	useEffect(() => {
		if (theme) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<Routes>
			<Route path="/user" element={<User />} />

			<Route path="/" element={<Dashboard />}>
				<Route index element={<NewDsr />} />
				<Route path="weekly" element={<WeeklyDsr />} />
				<Route path="drafts" element={<Drafts />} />
			</Route>

			{/* <Route path="/*" element={<ErrorPage />} /> */}
		</Routes>
	);
}

export default App;
