import React, { useState } from "react";
import "./Dashboard.css";
import BlockDataTable from "./BlockDataTable";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const StyledTabs = styled(Tabs)({
  backgroundColor: "#fff",
  borderRadius: 10,
  "& .MuiTabs-indicator": {
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "#D3D3D3",
    borderRadius: 10,
    "&.Mui-selected": {
      color: "#ec4400",
      zIndex: 1,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function Dashboard() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Active" />
          <StyledTab label="Waiting" />
        </StyledTabs>
        <div className="dashboard-header-search">
          <SearchIcon sx={{ color: "#ec4400", opacity: 0.5 }} />
          <input type="text" placeholder="Search Display Name" />
        </div>
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
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
