import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/body/sidebar/Sidebar";
import StakingView from "./components/tabs/staking/StakingView";
import HomeView from "./components/tabs/home/HomeView";
import { useRoutes } from "hookrouter";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./features/windowSizer/windowSlice";
import Divider from "@mui/material/Divider";
import "./extensions/WalletManager";
import "./App.css";

window.WalletExtension.subscribeMetaMask();

const routes = {
  "/": () => <HomeView />,
  "/staking": () => <StakingView />,
  "/staking/:chainId": ({ chainId }) => <StakingView chainId={chainId} />,
};

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const routeResult = useRoutes(routes);
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
      <Header />
      <div className="app-body">
        <Sidebar />
        {routeResult}
      </div>
      <div className="app-footer">
        <Divider sx={{ backgroundColor: "#7b7b7b" }} />
        <div className="footer-title">
          <h2> &copy;SUBSTAKE</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
