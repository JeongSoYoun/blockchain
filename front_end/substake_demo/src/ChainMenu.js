import React from "react";
import { CHAIN } from "./ChainInfo";
import { selectMenu, setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus } from "./features/userSelector/userSlice";
import "./ChainMenu.css";

function ChainMenu({ ChainName }) {
  const dispatch = useDispatch();
  const menuSelector = useSelector(selectMenu);
  window.WalletExtension.getMetaMaskBalance().then((balance) => {
    dispatch(
      setUserStatus({
        accountBalance: balance,
      })
    );
  });
  const onClickMenu = (e) => {
    const id = e.target.id;
    dispatch(
      setMenuStatus({
        main: "staking",
        sub: id,
      })
    );
    window.WalletExtension.requestExtension("metamask", menuSelector.sub);
  };
  return (
    <div className="chain-menu">
      <p>{ChainName.toUpperCase()}</p>
      {CHAIN[ChainName].map((paraChain) => (
        <div
          key={paraChain}
          className={
            menuSelector.sub === paraChain
              ? "chain-menus-selected"
              : "chain-menus"
          }
        >
          <h3 id={paraChain} onClick={(e) => onClickMenu(e)}>
            {paraChain.toUpperCase()}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default ChainMenu;
