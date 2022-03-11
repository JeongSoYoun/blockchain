import React from "react";
import WalletButton from "./WalletButton";
import "./Header.css";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const windowSizeSelector = useSelector(selectWindowSize);

  return (
    <div className="header">
      <h2 className="header-title" style={{ color: "#ffffff" }}>
        SUBSTAKE
      </h2>
      {/*Wallet*/}
      <div className="header-nav">
        <div className="header-wallet-buttons">
          <WalletButton wallet="Polkadot js" />
          <WalletButton wallet="MetaMask" />
        </div>
        {windowSizeSelector.isMobile ? (
          <MenuIcon className="header-menu-icon" />
        ) : null}
      </div>
    </div>
  );
}

export default Header;
