import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Home from "./Home";
import "./WalletHandler";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "./features/windowSizer/windowSlice";
import { selectMenu } from "./features/menuSelector/menuSlice";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const menuSelector = useSelector(selectMenu);
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
        {/* Home & Dashboard */}

        {menuSelector.main === "home" ? <Home /> : <Dashboard />}
      </div>
    </div>
  );
}

export default App;
