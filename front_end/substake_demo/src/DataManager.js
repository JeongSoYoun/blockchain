import axios from "axios";
import { sortByTotalBond } from "./utils";

let AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  data: {
    "chain-name": "moonbeam",
    "round-count": 1,
    "active-status": "False",
  },
};

export class DataManager {
  static requestChainData(
    setRows,
    setIsLoading,
    isMounted,
    chainName,
    roundCount,
    isActive
  ) {
    AXIOS_CONFIG.data["chain-name"] = chainName;
    AXIOS_CONFIG.data["round-count"] = roundCount;
    AXIOS_CONFIG.data["active-status"] = isActive;
    axios
      .post(
        process.env.NODE_ENV === "development"
          ? "/api/request"
          : "https://api.substake.app/api/request",
        AXIOS_CONFIG.data,
        AXIOS_CONFIG.headers
      )
      .then((blockData) => {
        if (isMounted) {
          let rows = blockData.data;
          rows = sortByTotalBond(rows);
          setRows(rows);
          setIsLoading((value) => !value);
        }
      })
      .catch((error) => {
        console.log("Error!");
        console.log(error);
      });
  }
}
