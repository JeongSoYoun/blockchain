
import {
    ApiPromise,
    WsProvider,
    Keyring
} from '@polkadot/api'
import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3FromSource
} from "@polkadot/extension-dapp";

import detectEthereumProvider from "@metamask/detect-provider";
const LOCAL_HOST = 'ws://localhost:9944';

class ExtensionTest {

    async get_polkadotJS() {

        const extensions = await web3Enable('127.0.0.1:8080');
        return extensions
    }

    async get_matamask() {

        const extensions = await detectEthereumProvider({
            mustBeMetaMask: true
        })

        return extensions
    }

    async get_moonbase_alpha(provider) {
        try {
            await provider.request({ method: 'eth_requestAccounts' })
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x507', // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
                    chainName: 'Moonbase Alpha',
                    nativeCurrency: {
                        name: 'DEV',
                        symbol: 'DEV',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.testnet.moonbeam.network'],
                    blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/']
                }]
            })
        } catch (e) {
            console.error(e);
        }
    }

    async get_account() {

        if (!isWeb3Injected) {
            throw new Error("Please install wallet extension first!")
        }
        const accounts = await web3Accounts();
        return accounts
    }

    async transfer(from, amount) {

        const provider = new WsProvider(LOCAL_HOST);
        const api = await ApiPromise.create({ provider });
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri('//Alice');
        const _to = alice.address
        const injector = await web3FromAddress(from);
        api.setSigner(injector.signer);
        const sign_and_send = api.tx.balances.transfer(_to, amount).signAndSend(from);

        return sign_and_send;
    }
}

window.ExtensionTest = new ExtensionTest()
