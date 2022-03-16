import StakingMain from "./StakingMain";
import Dashboard from "../../../components/body/dashboard/Dashboard";
import React from "react";

function StakingView({ chainId }) {
  return chainId ? <Dashboard chainId={chainId} /> : <StakingMain />;
}

export default StakingView;
