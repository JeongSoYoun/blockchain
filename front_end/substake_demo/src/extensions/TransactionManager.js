import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import abi from "../contracts/MoonbeamStakingABI.json";
import { RPC_ENDPOINT } from "./ChainInfo";

const DECIMALS = 18;
export class TransactionManager {
  static async StakingDelegateTX(
    collator_address,
    user_address,
    delegate_amount
  ) {
    console.log(collator_address);
    console.log(user_address);
    console.log(delegate_amount);
    const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000800";
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    const end_point = RPC_ENDPOINT[provider.chainId];
    const web3 = new Web3(end_point);
    const STAKE_AMOUNT = web3.utils
      .toBN(delegate_amount * 10 ** DECIMALS)
      .toString();
    const StakingContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const candidate_delegation_count = await StakingContract.methods
      .candidate_delegation_count(collator_address)
      .call();
    const delegate_delegation_count = await StakingContract.methods
      .delegator_delegation_count(user_address)
      .call();
    console.log(candidate_delegation_count);
    console.log(delegate_delegation_count);
    if (candidate_delegation_count > 350) {
      console.log("full of delegators");
      return;
    }
    const delegate_tx = StakingContract.methods.delegate(
      collator_address,
      STAKE_AMOUNT,
      candidate_delegation_count,
      delegate_delegation_count
    );
    const tx_params = {
      to: CONTRACT_ADDRESS,
      from: user_address,
      data: delegate_tx.encodeABI(),
    };
    const request_tx = await provider.request({
      method: "eth_sendTransaction",
      params: [tx_params],
    });

    return request_tx;
  }
}
