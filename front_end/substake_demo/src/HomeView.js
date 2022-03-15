import React from "react";
import "./Home.css";

function HomeView() {
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
