import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import axios from "axios";
import { sortByTotalBond } from "./utils";
import { SS58_REGISTRY } from "./ChainInfo";

let BLOCK_DATA_CONFIG = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  data: {
    "chain-name": "",
    "round-count": 1,
    "active-status": "",
    "user-address": "",
  },
};

async function getAccount(chainInfo, substrateAccount) {
  const provider = new WsProvider(chainInfo.end_point);
  const api = await ApiPromise.create({ provider: provider });
  return api.query.system.account(substrateAccount);
}

export class DataManager {
  static async getSubstrateBalances(substrateAccount) {
    const keyring = new Keyring();
    const publicKey = keyring.decodeAddress(substrateAccount);
    var data = [];
    const accounts = await Promise.all(
      Object.keys(SS58_REGISTRY).map((chain) => {
        const temp = {};
        temp["chain"] = chain;
        temp["symbol"] = SS58_REGISTRY[chain].symbol;
        temp["address"] = keyring.encodeAddress(
          publicKey,
          SS58_REGISTRY[chain].prefix
        );
        data.push(temp);
        return getAccount(SS58_REGISTRY[chain], substrateAccount);
      })
    );
    accounts.map((account, index) => {
      const freeBalance = account.data.free.toHuman();
      const reservedBalance = account.data.reserved.toHuman();
      const miscFrozenBalance = account.data.miscFrozen.toHuman();
      const feeFrozenBalance = account.data.feeFrozen.toHuman();
      return (
        (data[index]["free_balance"] = freeBalance),
        (data[index]["reserved_balance"] = reservedBalance),
        (data[index]["misc_frozen_balance"] = miscFrozenBalance),
        (data[index]["fee_frozen_balance"] = feeFrozenBalance)
      );
    });
    console.log(data);
  }

  static async requestChainData(
    setRows,
    setIsLoading,
    setCurrentRound,
    isMounted,
    chainName,
    roundCount,
    isActive,
    userAddress = ""
  ) {
    BLOCK_DATA_CONFIG.data["chain-name"] = chainName;
    BLOCK_DATA_CONFIG.data["round-count"] = roundCount;
    BLOCK_DATA_CONFIG.data["active-status"] = isActive;
    BLOCK_DATA_CONFIG.data["user-address"] = userAddress;
    console.log(userAddress);
    axios
      .post(
        process.env.NODE_ENV === "development"
          ? "/api/request"
          : "https://api.substake.app/api/request",
        BLOCK_DATA_CONFIG.data,
        BLOCK_DATA_CONFIG.headers
      )
      .then((blockData) => {
        if (isMounted) {
          console.log(blockData.data.collator_list);
          setRows(sortByTotalBond(blockData.data.collator_list));
          setIsLoading(false);
          setCurrentRound(blockData.data.current_round);
        }
      })
      .catch((error) => {
        console.log("Error requesting data");
        console.log(error);
      });
  }
}
