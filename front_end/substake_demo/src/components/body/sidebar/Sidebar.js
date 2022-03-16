import React from "react";
import ChainMenu from "./ChainMenu";
import { useSelector } from "react-redux";
import { selectWindowSize } from "../../../features/windowSizer/windowSlice";
import { selectMenu } from "../../../features/menuSelector/menuSlice";
import { A } from "hookrouter";
import "./Sidebar.css";

function Sidebar() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const menuSelector = useSelector(selectMenu);
  return windowSizeSelector.isMobile ? null : (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h2 className="sidebar-menu-title">Dashboard</h2>
        <A
          className={
            menuSelector.main === "home"
              ? "sidebar-menu-main-title-selected"
              : "sidebar-menu-main-title"
          }
          href="/"
        >
          Home
        </A>
        <A
          className={
            menuSelector.main === "staking"
              ? "sidebar-menu-main-title-selected"
              : "sidebar-menu-main-title"
          }
          href="/staking"
        >
          Staking
        </A>
        <div className="sidebar-chain-menu">
          <ChainMenu ChainName={"polkadot"} />
          <ChainMenu ChainName={"kusama"} />
          <ChainMenu ChainName={"testnet"} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
