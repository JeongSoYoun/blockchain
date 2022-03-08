import React from "react";
import "./WalletInjected.css";

function WalletInjected({ accounts }) {
  console.log("injected!");
  console.log(accounts);
  return (
    <div className="wallet-injected">
      <select className="wallet-injected-select">
        {accounts.map((account, index) => (
          <option key={index} value={account.address}>
            {" "}
            {account.address}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WalletInjected;
