/// <reference path="typing.d.ts" />

import {
    ApiPromise,
    WsProvider,
    Keyring
} from '@polkadot/api';

import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3FromSource
} from "@polkadot/extension-dapp";

import detectEthereumProvider from "@metamask/detect-provider";

const DAPP = 'my app';
const arr = [];

class Utils {

    createTextDiv(text: string) {

        const newDiv: HTMLDivElement = document.createElement('div');
        const displayedText: Text = document.createTextNode(text);
        newDiv.appendChild(displayedText);
        document.body.appendChild(newDiv);
    }
}

class web3Wallet {

    async get_polkadotJS() {

        const extension = await web3Enable(DAPP);
    }

    async get_account() {
        if (!isWeb3Injected) {
            throw new Error("Install wallet first!")
        }

        const accounts = await web3Accounts();
        return accounts
    }
}

window.web3Wallet = new web3Wallet();
window.utils = new Utils();