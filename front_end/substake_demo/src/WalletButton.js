import React, { useState } from "react";
import "./WalletButton.css";
import WalletInjected from "./WalletInjected";

function WalletButton({ wallet }) {
  const [accounts, setAccounts] = useState([]);
  async function getExtension() {
    if (wallet === "Polkadot js") {
      window.WalletExtension.getPolkadotWallet().then((result) => {
        window.WalletExtension.getPolkadotWalletAccount().then(
          (all_accounts) => {
            setAccounts(all_accounts);
          }
        );
      });
    } else {
      window.WalletExtension.getMetaMask().then((result) => {
        if (result) {
          window.WalletExtension.requestMetaMask(result);
        } else {
          console.log("Please install MetaMask!");
        }
      });
    }
  }
  return accounts.length > 0 ? (
    <WalletInjected accounts={accounts} />
  ) : (
    <div className="sidebar-wallet-button">
      <button onClick={() => getExtension()}>Connect with {wallet} </button>
    </div>
  );
}

export default WalletButton;
