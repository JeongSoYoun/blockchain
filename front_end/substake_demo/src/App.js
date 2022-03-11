import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./WalletHandler";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./features/windowSizer/windowSlice";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const WindowSizeHandler = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", WindowSizeHandler);
    if (width <= 1200) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
    return () => {
      window.removeEventListener("resize", WindowSizeHandler);
    };
  }, [width, dispatch]);

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
