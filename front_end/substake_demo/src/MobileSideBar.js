import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch } from "react-redux";
import "./MobileSideBar.css";

function MobileSideBar({ setOnAppearSideBar }) {
  const dispatch = useDispatch();
  const currentMenuHandler = (e) => {
    const mainMenu = e.target.id ? e.target.id : e.target.parentElement.id;
    dispatch(
      setMenuStatus({
        main: mainMenu,
        sub: "",
      })
    );
    setOnAppearSideBar(false);
  };
  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-header">
        <h3>MENU</h3>
        <CloseIcon
          sx={{ color: "white" }}
          onClick={() => setOnAppearSideBar(false)}
        />
      </div>
      <div className="mobile-sidebar-menu">
        <h4 id="home" onClick={(e) => currentMenuHandler(e)}>
          Home
        </h4>
        <h4 id="staking" onClick={(e) => currentMenuHandler(e)}>
          Staking
        </h4>
      </div>
    </div>
  );
}

export default MobileSideBar;
