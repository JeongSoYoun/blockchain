import React from "react";
import "./SubMenuOption.css";

function SubMenuOption({ sub, currentSubMenu, setCurrentSubMenu }) {
  const setMenu = () => {
    setCurrentSubMenu(sub);
  };
  return (
    <div className="submenu-option">
      <div
        className={
          currentSubMenu === sub
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
