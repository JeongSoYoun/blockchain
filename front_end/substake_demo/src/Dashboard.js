import React, { useState } from "react";
import BlockDataTable from "./BlockDataTable";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { selectMenu } from "./features/menuSelector/menuSlice";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import { selectUser } from "./features/userSelector/userSlice";
import { CURRENCY_SYMBOL } from "./ChainInfo";
import "./Dashboard.css";

function Dashboard() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const menuSelector = useSelector(selectMenu);
  const userSelector = useSelector(selectUser);
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState("active");
  const [currentRound, setCurrentRound] = useState(0);

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
                <p>
                  Stakeable Balance:{" "}
                  {userSelector ? userSelector.accountBalance : 0}
                </p>
                <p id="currency">{CURRENCY_SYMBOL[menuSelector.sub]}</p>
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
            chainName={menuSelector.sub}
            roundCount={1}
            isActive={true}
            setCurrentRound={setCurrentRound}
          />
        </div>
        <div className="dashboard-body">
          <BlockDataTable
            chainName={menuSelector.sub}
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
