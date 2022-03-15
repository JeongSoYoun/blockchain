import React from "react";
import { setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch } from "react-redux";
import "./StakingMainButton.css";

function StakingMainButton({ name }) {
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(
      setMenuStatus({
        main: "staking",
        sub: e.target.id.toLowerCase(),
      })
    );
  };
  return (
    <div className="staking-main-mutton">
      <button id={name} onClick={(e) => onClick(e)}>
        {name}
      </button>
    </div>
  );
}

export default StakingMainButton;
