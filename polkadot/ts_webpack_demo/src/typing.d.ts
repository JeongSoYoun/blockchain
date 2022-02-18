export { };

declare class web3Wallet {
    get_polkadotJS(): Promise<void>
}

declare global {
    interface Window {
        web3Wallet: web3Wallet;
    }
}
