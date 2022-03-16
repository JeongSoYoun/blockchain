import React from "react";
import { CHAIN } from "../../../extensions/ChainInfo";
import { A } from "hookrouter";
import { selectMenu } from "../../../features/menuSelector/menuSlice";
import { useSelector } from "react-redux";
import "./ChainMenu.css";

function ChainMenu({ ChainName }) {
  const menuSelector = useSelector(selectMenu);
  return (
    <div className="chain-menu">
      <p>{ChainName.toUpperCase()}</p>
      {CHAIN[ChainName].map((paraChain) => (
        <div
          className={
            menuSelector.sub === paraChain
              ? "chain-menu-link-selected"
              : "chain-menu-link"
          }
          key={paraChain}
        >
          <A href={`/staking/${paraChain}`}>{paraChain.toUpperCase()}</A>
        </div>
      ))}
    </div>
  );
}

export default ChainMenu;
