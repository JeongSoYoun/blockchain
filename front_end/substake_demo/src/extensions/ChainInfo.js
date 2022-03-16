export const CHAIN = {
  polkadot: ["moonbeam", "astar"],
  kusama: ["moonriver", "shiden"],
  testnet: ["moonbase"],
};

export const RPC_ENDPOINT = {
  "0x504": "wss://wss.api.moonbeam.network",
  "0x505": "wss://wss.api.moonriver.moonbeam.network",
  "0x507": "https://rpc.api.moonbase.moonbeam.network",
};

export const CURRENCY_SYMBOL = {
  polkadot: "DOT",
  kusama: "KSM",
  moonbeam: "GLMR",
  moonriver: "MOVR",
  moonbase: "DEV",
};

export const REQUEST_PARAMS = {
  moonbeam: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x504", // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
        chainName: "Moonbeam",
        nativeCurrency: {
          name: "GLMR",
          symbol: "GLMR",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.api.moonbeam.network"],
        blockExplorerUrls: ["https://moonscan.io/"],
      },
    ],
  },
  moonriver: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x505", // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
        chainName: "Moonriver",
        nativeCurrency: {
          name: "MOVR",
          symbol: "MOVR",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.api.moonriver.moonbeam.network"],
        blockExplorerUrls: ["https://moonscan.io/"],
      },
    ],
  },
  moonbase: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x507", // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
        chainName: "Moonbase Alpha",
        nativeCurrency: {
          name: "DEV",
          symbol: "DEV",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
        blockExplorerUrls: ["https://moonbase.moonscan.io/"],
      },
    ],
  },
};
