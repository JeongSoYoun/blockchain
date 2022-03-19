
export { };

declare class web3Wallet {
    get_polkadotJS(): Promise<void>;
    get_account();
}

declare class Utils {
    createTextDiv(text: string): void;
}

declare global {
    interface Window {
        web3Wallet: web3Wallet;
        utils: Utils;
    }
}
