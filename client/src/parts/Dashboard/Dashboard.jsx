import React, { createContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

export const transferData = createContext();
export const takeData = createContext();

function Dashboard({ theme, themeSwitch }) {
  const location = useLocation();
  const [ham, setHam] = useState(false);
  const [useDraft, setUseDraft] = useState({});

  // variable to store data of the draft to provide it to newDsr comp.

  const [draftValue, setDraftData] = useState();
  const [isUse, setIsUse] = useState(false);

  return (
    <transferData.Provider value={{ draftValue, setDraftData }}>
      <takeData.Provider value={{ isUse, setIsUse }}>
        <div className="dashboard">
          <Sidebar
            location={location}
            theme={theme}
            ham={ham}
            setHam={setHam}
          />

          <section className="main-content">
            <Topbar ham={ham} setHam={setHam} themeSwitch={themeSwitch} />

            <div className="container">
              <Outlet context={[useDraft, setUseDraft]} />
            </div>
          </section>
        </div>
      </takeData.Provider>
    </transferData.Provider>
  );
}

export default Dashboard;
