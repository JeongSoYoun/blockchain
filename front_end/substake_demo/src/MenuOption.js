import React, { useState } from "react";
import "./MenuOption.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SubMenuOption from "./SubMenuOption";

const SIDE_MENU = {
  Polkadot: ["Polkadot", "Moonbeam", "Astar"],
  Kusama: ["Kusama", "Moonriver", "Shiden"],
  TestNet: ["WestEnd"],
};

function MenuOption({ title }) {
  const [isClick, setIsClick] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState("");
  function toggleIsClick() {
    setIsClick((click) => !click);
  }
  return (
    <div className="menu-option">
      <div className="menu-option-detail">
        <div onClick={toggleIsClick} className="menu-option-title">
          <p>{title}</p>
          {isClick ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </div>
        {isClick
          ? SIDE_MENU[title].map((sub) => (
              <SubMenuOption
                key={sub}
                sub={sub}
                currentSubMenu={currentSubMenu}
                setCurrentSubMenu={setCurrentSubMenu}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default MenuOption;
