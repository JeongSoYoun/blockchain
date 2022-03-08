import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import detectEthereumProvider from "@metamask/detect-provider";

class WalletExtension {
  async getPolkadotWallet() {
    await web3Enable("SUBSTAKE");
  }

  async getMetaMask() {
    const extensions = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
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
    if (!isWeb3Injected) {
      throw new Error("Please install extension first!");
    }
    const accounts = await web3Accounts();
    return accounts;
  }
}

window.WalletExtension = new WalletExtension();
