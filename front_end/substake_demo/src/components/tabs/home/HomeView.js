import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuStatus } from "../../../features/menuSelector/menuSlice";
import "./Home.css";

function HomeView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMenuStatus({
        main: "home",
      })
    );
  }, [dispatch]);
  return (
    <div className="home">
      <div className="home-balance-status">
        <div className="status-header">
          <h3>Balance</h3>
        </div>
        <div className="status-info">
          <p>Please Connect Wallet</p>
        </div>
      </div>
      <div className="home-stake-status">
        <div className="status-header">
          <h3>Stake Status</h3>
        </div>
        <div className="status-info">
          <p>Please Connect Wallet</p>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
