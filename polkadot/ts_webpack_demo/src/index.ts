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

class web3Wallet {

    async get_polkadotJS() {

        const extension = await web3Enable(DAPP);
    }
}

window.web3Wallet = new web3Wallet();