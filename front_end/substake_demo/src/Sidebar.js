import React from "react";
import "./Sidebar.css";
import MenuOption from "./MenuOption";
import WalletButton from "./WalletButton";

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
        <MenuOption title="Favorites" />
        <MenuOption title="Polkadot" />
        <MenuOption title="Kusama" />
        <MenuOption title="TestNet" />
      </div>
    </div>
  );
}

export default Sidebar;
