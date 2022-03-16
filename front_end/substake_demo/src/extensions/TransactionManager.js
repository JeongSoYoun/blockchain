import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import abi from "./contracts/MoonbeamStakingABI.json";
import { RPC_ENDPOINT } from "../ChainInfo";

export class TransactionManager {
  static async DelegateTX(
    collater_address,
    delegate_amount,
    candidate_delegation_count,
    deleagtion_count
  ) {
    const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000800";
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    const end_point = RPC_ENDPOINT[provider.chainId];
    const web3 = new Web3(end_point);
    const StakingContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const delegate_tx = StakingContract.methods.delegate(
      collater_address,
      delegate_amount,
      candidate_delegation_count,
      deleagtion_count
    );
    const tx_params = {
      to: CONTRACT_ADDRESS,
      from: provider.selectedAddress,
      data: delegate_tx.encodeABI(),
    };
    const request_tx = await provider.request({
      method: "eth_sendTransaction",
      params: [tx_params],
    });
    return request_tx;
  }
}
