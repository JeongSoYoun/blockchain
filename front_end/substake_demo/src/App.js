import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./WalletHandler";

function App() {
  return (
    <div className="app">
      {/* Sticky Header*/}
      <Header />
      {/* Body */}
      <div className="app-body">
        {/* Wallet & Menu */}
        <Sidebar />
        {/* Dashboard */}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
