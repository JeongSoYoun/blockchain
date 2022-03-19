export const CHAIN = {
  // Use for Sidebar Menu
  polkadot: ["moonbeam", "astar"],
  kusama: ["moonriver", "shiden"],
  testnet: ["moonbase"],
};

export const RPC_ENDPOINT = {
  // Use for web3.js
  "0x504": "wss://wss.api.moonbeam.network",
  "0x505": "wss://wss.api.moonriver.moonbeam.network",
  "0x507": "https://rpc.api.moonbase.moonbeam.network",
};

export const CURRENCY_SYMBOL = {
  // Use for Dashboard Currency
  polkadot: "DOT",
  kusama: "KSM",
  moonbeam: "GLMR",
  moonriver: "MOVR",
  moonbase: "DEV",
};

export const REQUEST_PARAMS = {
  // Use for Switching MetaMask
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

export const SS58_REGISTRY = {
  // for getting all Substrate balances
  polkadot: { prefix: 0, symbol: "DOT", end_point: "wss://rpc.polkadot.io" },
  acala: {
    prefix: 10,
    symbol: "ACA",
    end_point: "wss://acala-polkadot.api.onfinality.io/public-ws",
  },
  astar: { prefix: 5, symbol: "ASTR", end_point: "wss://rpc.astar.network" },
  kusama: {
    prefix: 2,
    symbol: "KSM",
    end_point: "wss://kusama-rpc.polkadot.io",
  },
  karura: {
    prefix: 8,
    symbol: "KAR",
    end_point: "wss://karura.api.onfinality.io/public-ws",
  },
  khala: {
    prefix: 30,
    symbol: "PHA",
    end_point: "wss://khala.api.onfinality.io/public-ws",
  },
  shiden: {
    prefix: 5,
    symbol: "SDN",
    end_point: "wss://shiden.api.onfinality.io/public-ws",
  },
  bifrost: {
    prefix: 6,
    symbol: "BNC",
    end_point: "wss://bifrost-parachain.api.onfinality.io/public-ws",
  },
  calamari: {
    prefix: 78,
    symbol: "KMA",
    end_point: "wss://calamari.api.onfinality.io/public-ws",
  },
  polkadex: {
    prefix: 88,
    symbol: "PDEX",
    end_point: "wss://mainnet.polkadex.trade",
  },
};
