import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINT, REQUEST_PARAMS } from "./ChainInfo";
import Web3 from "web3";

class WalletExtension {
  async requestExtension(name, menu) {
    if (name === "dot") {
      await web3Enable("SUBSTAKE");
      if (!isWeb3Injected) {
        throw new Error("Please install extension first!");
      }
      const accounts = await web3Accounts();
      return accounts;
    } else {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });

      if (provider) {
        try {
          await provider.request({ method: "eth_requestAccounts" });
          await provider.request(REQUEST_PARAMS[menu]);
          return provider.selectedAddress;
        } catch (e) {
          console.log(e);
        }
      } else {
        throw new Error("Please install MetaMask first!");
      }
    }
  }

  async subscribeMetaMask() {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user doesn't have any connected accounts
        console.log("Please connect to MetaMask.");
      }
      window.location.reload();
    });
    provider.on("chainChanged", () => {
      // MetaMask recommends reloading the page unless you have good reason not to
      window.location.reload();
    });
  }

  async getMetaMaskBalance() {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    const end_point = RPC_ENDPOINT[provider.chainId];
    const web3 = new Web3(end_point);
    return web3.utils.fromWei(
      await web3.eth.getBalance(provider.selectedAddress),
      "ether"
    );
  }
}

window.WalletExtension = new WalletExtension();
