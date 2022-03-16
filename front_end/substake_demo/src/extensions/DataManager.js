import axios from "axios";
import { sortByTotalBond } from "./utils";

let BLOCK_DATA_CONFIG = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  data: {
    "chain-name": "moonbeam",
    "round-count": 1,
    "active-status": "False",
  },
};

let STAKING_INFO_CONFIG = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  data: {
    "chain-name": "",
    "collator-address": "",
    "user-address": "",
  },
};

export class DataManager {
  static requestChainData(
    setRows,
    setIsLoading,
    setCurrentRound,
    isMounted,
    chainName,
    roundCount,
    isActive
  ) {
    BLOCK_DATA_CONFIG.data["chain-name"] = chainName;
    BLOCK_DATA_CONFIG.data["round-count"] = roundCount;
    BLOCK_DATA_CONFIG.data["active-status"] = isActive;
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
          console.log(blockData.data);
          setCurrentRound(blockData.data.current_round);
          let rows = blockData.data.collator_list;
          rows = sortByTotalBond(rows);
          setRows(rows);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error!");
        console.log(error);
      });
  }

  static requestStakeInfo(chain_name, collator_address, user_address) {
    STAKING_INFO_CONFIG.data["chain-name"] = chain_name;
    STAKING_INFO_CONFIG.data["collator-address"] = collator_address;
    STAKING_INFO_CONFIG.data["user-address"] = user_address;
    axios
      .post(
        process.env.NODE_ENV === "development"
          ? "/api/request/staking/getCount"
          : "https://api.substake.app/api/request/staking/getCount",
        BLOCK_DATA_CONFIG.data,
        BLOCK_DATA_CONFIG.headers
      )
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log("Error!");
        console.log(error);
      });
  }
}
