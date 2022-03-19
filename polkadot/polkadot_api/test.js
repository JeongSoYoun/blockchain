var rp = require("request-promise-native");

const OPTIONS = {
  uri: "http://209.145.51.70:8000/api/request",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {
    "chain-name": "moonbeam",
    "round-count": 1,
    "active-status": "True",
  },
  json: true,
};

export class DataManager {
  static requestChainData(chainName, roundCount, isActive) {
    OPTIONS.body["chain-name"] = chainName;
    OPTIONS.body["round-count"] = roundCount;
    OPTIONS.body["active-status"] = isActive;
    rp(OPTIONS)
      .then(function (blocks) {
        return blocks;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
