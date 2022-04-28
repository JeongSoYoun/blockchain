var rp = require("request-promise-native");

const OPTIONS = {
  uri: "",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {
    "chain-name": "moonbeam",
    "round-count": 1,
    "active-status": "True",
  },
  json: true,
};

class DataManager {
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
