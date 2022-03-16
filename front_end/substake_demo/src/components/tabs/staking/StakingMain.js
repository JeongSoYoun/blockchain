import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuStatus } from "../../../features/menuSelector/menuSlice";
import StakingMainLink from "./StakingMainLink";
import "./StakingMain.css";

function StakingMain() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMenuStatus({
        main: "staking",
      })
    );
  }, [dispatch]);
  return (
    <div className="staking-main">
      <div id="dot">
        <h3>Polkadot</h3>
        <div className="staking-main-links">
          <StakingMainLink name="moonbeam" />
          <StakingMainLink name="astar" />
        </div>
      </div>
      <div id="kusama">
        <h3>Kusama</h3>
        <div className="staking-main-links">
          <StakingMainLink name="moonriver" />
          <StakingMainLink name="shiden" />
        </div>
      </div>
      <div id="testnet">
        <h3>TestNet</h3>
        <div className="staking-main-links">
          <StakingMainLink name="moonbase" />
        </div>
      </div>
    </div>
  );
}

export default StakingMain;
