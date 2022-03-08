import React from "react";
import "./Dashboard.css";
import DataTable from "./DataTable";
// import SwipeableViews from "react-swipeable-views";
import SearchIcon from "@mui/icons-material/Search";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3 style={{ color: "#ffffff" }}>Active/Waiting</h3>
        <div className="dashboard-header-search">
          <SearchIcon sx={{ color: "#ec4400", opacity: 0.5 }} />
          <input type="text" placeholder="Search Display Name" />
        </div>
      </div>
      <div className="dashboard-body">
        <DataTable />
      </div>
    </div>
  );
}

export default Dashboard;
