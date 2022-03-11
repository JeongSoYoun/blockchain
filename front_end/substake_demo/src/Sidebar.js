import React from "react";
import "./Sidebar.css";
import MenuOption from "./MenuOption";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";

const DASHBOARD_TITLE = ["Polkadot", "Kusama", "TestNet"];

function Sidebar() {
  const windowSizeSelector = useSelector(selectWindowSize);

  return windowSizeSelector.isMobile ? null : (
    <div className="sidebar">
      {/*Menu*/}
      <div className="sidebar-menu">
        <h2 className="sidebar-menu-title">Dashboard</h2>
        {DASHBOARD_TITLE.map((title) => (
          <MenuOption key={title} title={title} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
