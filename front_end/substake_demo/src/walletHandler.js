import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import detectEthereumProvider from "@metamask/detect-provider";

class WalletExtension {
  async injectPolkadotWallet() {
    await web3Enable("SUBSTAKE");
    if (!isWeb3Injected) {
      throw new Error("Please install extension first!");
    }
  }

  async injectMetaMask() {
    const extensions = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    if (extensions === null) {
      throw new Error("Please install MetaMask first!");
    }
    return extensions;
  }

  async requestMetaMask(provider) {
    try {
      await provider.request({ method: "eth_requestAccounts" });
    } catch (e) {
      console.log(e);
    }
  }

  async getPolkadotWalletAccount() {
    const accounts = await web3Accounts();
    return accounts;
  }
}

window.WalletExtension = new WalletExtension();
