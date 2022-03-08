import React from "react";
import "./MenuOption.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function MenuOption({ title }) {
  return (
    <div className="menu-option">
      <div className="menu-option-detail">
        <p>{title}</p>
        <KeyboardArrowRightIcon />
      </div>
    </div>
  );
}

export default MenuOption;
