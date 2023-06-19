import React, { useEffect, useState, memo, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./assets/sass/main.css";
import NewDsr from "./routes/NewDsr/NewDsr";
import WeeklyDsr from "./routes/WeeklyDsr/WeeklyDsr";
import Drafts from "./routes/Drafts/Drafts";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Dashboard from "./parts/Dashboard/Dashboard";
// import Admindashboard from "./parts/Admin_dashboard/Admindashboard";

function PrivateRoute({ element }) {
  const user = localStorage.getItem("usercred");
  const microsoftUser = localStorage.getItem("MicrosoftUserData");
  if (user || microsoftUser) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
}

//dark mode issue resolved and routing and authentications of client and admin conditional routing :----- Ayush Mishra.

const MemoizedPrivateRoute = memo(PrivateRoute);

const logOutMicrosoft = createContext();

export default function App() {
  // Authentication
  // console.log(JSON.parse(localStorage.getItem("usercred")));

  // Theme Switching
  let [theme, setTheme] = useState(false);

  const [microFun, setMicrofun] = useState();

  let newTheme = false;
  function themeSwitch() {
    newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, [theme]);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // const user = JSON.parse(localStorage.getItem("usercred"));
  // const isAdmin = user && user.isAdmin;

  return (
    <Routes>
      <>
        <logOutMicrosoft.Provider setMicrofun>
          <Route path="/login" element={<Login />} />
        </logOutMicrosoft.Provider>
        <Route path="/register" element={<Register />} />
      </>

      <Route
        path="/"
        element={
          <MemoizedPrivateRoute
            element={
              // isAdmin ? (
              //   <Admindashboard
              //     theme={theme}
              //     themeSwitch={themeSwitch}
              //     setTheme={setTheme}
              //   />
              // ) : (
              <Dashboard
                theme={theme}
                themeSwitch={themeSwitch}
                setTheme={setTheme}
              />
              // )
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
export { logOutMicrosoft };
