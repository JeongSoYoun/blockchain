import React from "react";
import { selectMenu, setMenuStatus } from "./features/menuSelector/menuSlice";
import { useDispatch, useSelector } from "react-redux";

import "./MobileHeaderTab.css";
function MobileHeaderTab({ title }) {
  const menuSelector = useSelector(selectMenu);
  const dispatch = useDispatch();
  const onClick = (e) => {
    const title = e.target.id.toLowerCase();
    dispatch(
      setMenuStatus({
        main: title,
      })
    );
  };
  return (
    <h3
      id={title}
      onClick={(e) => onClick(e)}
      className={
        menuSelector.main === title.toLowerCase()
          ? "mobile-header-tab-title-selected"
          : "mobile-header-tab-title"
      }
    >
      {title}
    </h3>
  );
}

export default MobileHeaderTab;
