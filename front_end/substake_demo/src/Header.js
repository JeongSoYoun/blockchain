import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h2 className="header-title" style={{ color: "#ffffff" }}>
        SUBSTAKE
      </h2>
      <div className="header-info">
        {" "}
        <p>Stakeable Balance: 1000 DOT</p>
        <p>Current Round: 245 </p>
      </div>
    </div>
  );
}

export default Header;
