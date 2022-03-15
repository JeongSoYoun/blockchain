import StakingMain from "./StakingMain";
import Dashboard from "./Dashboard";
import { selectMenu } from "./features/menuSelector/menuSlice";
import { useSelector } from "react-redux";
import React from "react";

function StakingView() {
  const menuSelector = useSelector(selectMenu);
  return menuSelector.sub ? <Dashboard /> : <StakingMain />;
}

export default StakingView;
