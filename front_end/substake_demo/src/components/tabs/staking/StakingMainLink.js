import React from "react";
import { A } from "hookrouter";
import "./StakingMainLink.css";

function StakingMainLink({ name }) {
  return (
    <div className="staking-main-link">
      <A href={`/staking/${name}`}>{name}</A>
    </div>
  );
}

export default StakingMainLink;
