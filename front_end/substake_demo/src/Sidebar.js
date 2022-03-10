import React, { useState } from "react";
import "./Sidebar.css";
import MenuOption from "./MenuOption";
import WalletButton from "./WalletButton";

const DASHBOARD_TITLE = ["Polkadot", "Kusama", "TestNet"];

function Sidebar() {
  return (
    <div className="sidebar">
      {/*Wallet*/}
      <div className="sidebar-wallet">
        <h2>Wallet</h2>
        <div className="sidebar-wallet-buttons">
          <WalletButton wallet="Polkadot js" />
          <WalletButton wallet="MetaMask" />
        </div>
      </div>

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
