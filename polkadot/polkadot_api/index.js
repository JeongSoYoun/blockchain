import { DataManager } from "./test";

function main() {
  let onChain = DataManager.requestChainData(
    (chainName = "moonbeam"),
    (roundCount = 1),
    (isActive = "True")
  );
  console.log(onChain);
}
main();
