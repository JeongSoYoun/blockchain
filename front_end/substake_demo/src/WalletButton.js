import React, { useState } from "react";
import dot from "./dot.png";
import metamask from "./metamask.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserStatus } from "./features/userSelector/userSlice";
import { selectMenu } from "./features/menuSelector/menuSlice";
import "./WalletButton.css";

const dotImg = dot;
const metamaskImg = metamask;

function WalletButton({ wallet }) {
  const menuSelector = useSelector(selectMenu);
  async function getExtension() {
    window.WalletExtension.requestExtension(wallet, menuSelector.sub).catch(
      (error) => alert(error)
    );
  }
  return (
    <div
      onClick={getExtension}
      className={
        wallet === "dot" ? "header-wallet-button-dot" : "header-wallet-button"
      }
    >
      {<img src={wallet === "dot" ? dotImg : metamaskImg} alt="" />}
    </div>
  );
}

export default WalletButton;
