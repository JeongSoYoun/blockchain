import React, { useState } from "react";
import BlockDataTable from "./BlockDataTable";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import "./Dashboard.css";

function Dashboard() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState("active");

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
              <p>Stakeable Balance: 1000 DOT</p>
              <p>Current Round: 245 </p>
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
            chainName={"moonbeam"}
            roundCount={1}
            isActive={true}
          />
        </div>
        <div className="dashboard-body">
          <BlockDataTable
            chainName={"moonbeam"}
            roundCount={1}
            isActive={false}
          />
        </div>
      </SwipeableViews>
    </div>
  );
}

export default Dashboard;
