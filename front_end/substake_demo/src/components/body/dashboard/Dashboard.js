import React, { useEffect, useState } from "react";
import BlockDataTable from "./table/BlockDataTable";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setMenuStatus } from "../../../features/menuSelector/menuSlice";
import { selectWindowSize } from "../../../features/windowSizer/windowSlice";
import { CURRENCY_SYMBOL } from "../../../extensions/ChainInfo";
import "./Dashboard.css";

function Dashboard({ chainId }) {
  const windowSizeSelector = useSelector(selectWindowSize);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [currentTab, setCurrentTab] = useState("active");
  const [currentRound, setCurrentRound] = useState(0);
  window.WalletExtension.requestExtension("metamask", chainId);
  window.WalletExtension.getMetaMaskBalance().then((balance) => {
    setAccountBalance(Number(balance).toFixed(2));
  });
  useEffect(() => {
    dispatch(
      setMenuStatus({
        main: "staking",
        sub: chainId,
      })
    );
  }, [dispatch, chainId]);

  const handleChange = (event) => {
    if (event.target.id === "active") {
      setIndex(0);
      handledSelectedTab("active");
    } else {
      setIndex(1);
      handledSelectedTab("waiting");
    }
  };
  const handleChangeIndex = (index) => {
    setIndex(index);
  };
  const handledSelectedTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-tabs">
          <div
            id="active"
            className={
              currentTab === "active"
                ? "dashboard-header-tab-selected"
                : "dashboard-header-tab"
            }
            onClick={(event) => handleChange(event)}
          >
            Active
          </div>
          <div
            id="waiting"
            className={
              currentTab === "waiting"
                ? "dashboard-header-tab-selected"
                : "dashboard-header-tab"
            }
            onClick={(event) => handleChange(event)}
          >
            Waiting
          </div>
        </div>
        {windowSizeSelector.isMobile ? null : (
          <div className="dashboard-header-app-bar">
            <div className="dashboard-header-info">
              <div className="dashboard-header-info-balance">
                <p>Stakeable Balance: {accountBalance}</p>
                <p id="currency">{CURRENCY_SYMBOL[chainId]}</p>
              </div>
              <p>Current Round: {currentRound} </p>
            </div>
            <div className="dashboard-header-search">
              <SearchIcon sx={{ color: "#ec4400", opacity: 0.5 }} />
              <input type="text" placeholder="Search Display Name" />
            </div>
          </div>
        )}
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={index}
        onChangeIndex={handleChangeIndex}
        className="dashboard-swipe-view"
      >
        <div className="dashboard-body">
          <BlockDataTable
            chainName={chainId}
            roundCount={1}
            isActive={true}
            setCurrentRound={setCurrentRound}
          />
        </div>
        <div className="dashboard-body">
          <BlockDataTable
            chainName={chainId}
            roundCount={1}
            isActive={false}
            setCurrentRound={setCurrentRound}
          />
        </div>
      </SwipeableViews>
    </div>
  );
}

export default Dashboard;
