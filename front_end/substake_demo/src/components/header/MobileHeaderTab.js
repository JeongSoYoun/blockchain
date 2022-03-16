import React from "react";
import { A } from "hookrouter";
import "./MobileHeaderTab.css";
import { selectMenu } from "../../features/menuSelector/menuSlice";
import { useSelector } from "react-redux";

function MobileHeaderTab({ title }) {
  const menuSelector = useSelector(selectMenu);
  return title === "Home" ? (
    <A
      className={
        menuSelector.main === title.toLowerCase()
          ? "header-tab-selected"
          : "header-tab"
      }
      href="/"
    >
      Home
    </A>
  ) : (
    <A
      className={
        menuSelector.main === title.toLowerCase()
          ? "header-tab-selected"
          : "header-tab"
      }
      href="/staking"
    >
      Staking
    </A>
  );
}

export default MobileHeaderTab;
