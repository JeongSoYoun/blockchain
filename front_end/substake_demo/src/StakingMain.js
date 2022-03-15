import React from "react";
import "./StakingMain.css";
import StakingMainButton from "./StakingMainButton";

function StakingMain() {
  return (
    <div className="staking-main">
      <div id="dot">
        <h3>Polkadot</h3>
        <div className="staking-main-buttons">
          <StakingMainButton name={"MoonBeam"} />
          <StakingMainButton name={"Acala"} />
        </div>
      </div>
      <div id="kusama">
        <h3>Kusama</h3>
        <div className="staking-main-buttons">
          <StakingMainButton name={"MoonRiver"} />
          <StakingMainButton name={"Shiden"} />
        </div>
      </div>
      <div id="testnet">
        <h3>TestNet</h3>
        <div className="staking-main-buttons">
          <StakingMainButton name={"Moonbase Alpha"} />
        </div>
      </div>
    </div>
  );
}

export default StakingMain;
