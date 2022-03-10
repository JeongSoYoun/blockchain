import React from "react";
import { getKeyByValue } from "./utils";
import "./SubMenuOption.css";
import { useSelector } from "react-redux";

function SubMenuOption({ sub, sideMenu, currentMenu, setCurrentMenu }) {
  const setMenu = () => {
    setCurrentMenu(sub);
  };
  return (
    <div className="submenu-option">
      <div
        className={
          currentMenu === sub
            ? "submenu-option-detail-selected"
            : "submenu-option-detail-unselected"
        }
        onClick={() => setMenu()}
      >
        {sub}
      </div>
    </div>
  );
}

export default SubMenuOption;
