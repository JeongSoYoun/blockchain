import React from "react";
import WalletButton from "./WalletButton";
import { useSelector } from "react-redux";
import { selectWindowSize } from "../../features/windowSizer/windowSlice";
import { setMenuStatus } from "../../features/menuSelector/menuSlice";
import { useDispatch } from "react-redux";
import MobileHeaderTab from "./MobileHeaderTab";
import "./Header.css";

function Header() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const dispatch = useDispatch();
  const currentMenuHandler = (e) => {
    const mainMenu = e.target.id ? e.target.id : e.target.parentElement.id;
    dispatch(
      setMenuStatus({
        main: mainMenu,
        sub: "",
      })
    );
  };
  return (
    <div className="header-wrapper">
      <div id="app-header" className="header">
        <h2
          id="home"
          onClick={(e) => currentMenuHandler(e)}
          className="header-title"
          style={{ color: "#ffffff" }}
        >
          SUBSTAKE
        </h2>
        {/*Wallet*/}
        <div className="header-nav">
          <div className="header-wallet-buttons">
            <WalletButton wallet="dot" />
            <WalletButton wallet="metamask" />
          </div>
        </div>
      </div>
      {windowSizeSelector.isMobile ? (
        <div className="header-mobile-tabs">
          <MobileHeaderTab title="Home" />
          <MobileHeaderTab title="Staking" />
        </div>
      ) : null}
    </div>
  );
}

export default Header;
