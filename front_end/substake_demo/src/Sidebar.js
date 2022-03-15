import React from "react";
import ChainMenu from "./ChainMenu";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import { selectMenu, setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch } from "react-redux";
import "./Sidebar.css";

function Sidebar() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const menuSelector = useSelector(selectMenu);
  const dispatch = useDispatch();

  const currentMenuHandler = (e) => {
    const mainMenu = e.target.id ? e.target.id : e.target.parentElement.id;
    dispatch(
      setMenuStatus({
        main: mainMenu,
      })
    );
  };
  return windowSizeSelector.isMobile ? null : (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h2 className="sidebar-menu-title">Dashboard</h2>
        <div
          id="home"
          onClick={(e) => currentMenuHandler(e)}
          className={
            menuSelector.main === "home"
              ? "sidebar-menu-option-selected"
              : "sidebar-menu-option"
          }
        >
          <h3>Home</h3>
        </div>
        <div
          id="staking"
          onClick={(e) => currentMenuHandler(e)}
          className={
            menuSelector.main === "staking"
              ? "sidebar-menu-option-selected"
              : "sidebar-menu-option"
          }
        >
          <h3>Staking</h3>
        </div>
        {menuSelector.main === "staking" ? (
          <div className="sidebar-chain-menu">
            <ChainMenu ChainName={"polkadot"} />
            <ChainMenu ChainName={"kusama"} />
            <ChainMenu ChainName={"testnet"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
