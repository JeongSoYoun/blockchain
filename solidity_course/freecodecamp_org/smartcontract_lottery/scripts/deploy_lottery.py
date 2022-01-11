
from scripts.deploy_handler import get_account, get_contract, fund_with_link
from brownie import network, Lottery, config
import time 

def deploy_lottery():

    account = get_account()
    contract = Lottery.deploy (

        get_contract("eth_usd_price_feed").address,
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["fee"],
        config["networks"][network.show_active()]["keyhash"],

        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False)
    )

    print("Deployed Lottery Contract")
    return contract

def start_lottery():

    account = get_account()
    contract = Lottery[-1] # most recent contract deployed
    tx = contract.startLottery({"from": account})
    tx.wait(1)
    print("Lottery has been started!")

def enter_lottery():

    account = get_account()
    contract = Lottery[-1]
    value = contract.getEntranceFee()
    tx = contract.enter({"from": account, "value": value})
    tx.wait(1)

    print("You have entered the lottery!")

def end_lottery():

    account = get_account()
    contract = Lottery[-1]
    # fund the contract with Link token
    tx = fund_with_link(contract)
    tx.wait(1)
    # then end the lottery
    ending_tx = contract.endLottery({"from": account})
    ending_tx.wait(1)
    time.sleep(20)
    print(f"{contract.winner()} is the winner!")


def main():
    
    deploy_lottery()
    start_lottery()
    enter_lottery()
    end_lottery()