import React, { useState } from "react";
import "./WalletButton.css";
import WalletInjected from "./WalletInjected";
import dot from "./dot.png";
import metamask from "./metamask.png";

function WalletButton({ wallet }) {
  const [accounts, setAccounts] = useState([]);
  async function getExtension() {
    if (wallet === "Polkadot js") {
      window.WalletExtension.injectPolkadotWallet()
        .then((_) => {
          window.WalletExtension.getPolkadotWalletAccount().then(
            (all_accounts) => {
              setAccounts(all_accounts);
            }
          );
        })
        .catch((error) => alert(error));
    } else {
      window.WalletExtension.injectMetaMask()
        .then((result) => {
          if (result) {
            window.WalletExtension.requestMetaMask(result);
          } else {
            console.log("Please install MetaMask!");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
  return accounts.length > 0 ? (
    <WalletInjected accounts={accounts} />
  ) : (
    <div
      onClick={getExtension}
      className={
        wallet === "Polkadot js"
          ? "header-wallet-button-dot"
          : "header-wallet-button"
      }
    >
      {wallet === "Polkadot js" ? (
        <img src={dot} alt="" />
      ) : (
        <img src={metamask} alt="" />
      )}
    </div>
  );
}

export default WalletButton;
