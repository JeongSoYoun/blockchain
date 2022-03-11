import React from "react";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import { selectMenu, setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch } from "react-redux";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Sidebar.css";

function Sidebar() {
  const windowSizeSelector = useSelector(selectWindowSize);
  const menuSelector = useSelector(selectMenu);
  const dispatch = useDispatch();

  const currentMenuHandler = (e) => {
    const mainMenu = e.target.id ? e.target.id : e.target.parentElement.id;
    dispatch(
      setMenuStatus({
        main: mainMenu,
        sub: "",
      })
    );
  };
  return windowSizeSelector.isMobile ? null : (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h2 className="sidebar-menu-title">Dashboard</h2>
        <div
          id="home"
          onClick={(e) => currentMenuHandler(e)}
          className={
            menuSelector.main === "home"
              ? "sidebar-menu-option-selected"
              : "sidebar-menu-option"
          }
        >
          <h3>Home</h3>
        </div>
        <div
          id="staking"
          onClick={(e) => currentMenuHandler(e)}
          className={
            menuSelector.main === "staking"
              ? "sidebar-menu-option-selected"
              : "sidebar-menu-option"
          }
        >
          <h3>Staking</h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
