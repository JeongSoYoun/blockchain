
from brownie import Lottery, config, network
from scripts.deploy_handler import get_account, get_contract

def check_value():

    account = get_account()
    contract = Lottery.deploy(

        get_contract("eth_usd_price_feed").address,
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["fee"],
        config["networks"][network.show_active()]["keyhash"],

        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False)
    )

    (fee, ethPrice) = contract.getPrice()
    adjustedPrice = ethPrice * 10**10
    cost = fee/adjustedPrice * 10**18
    print("test")
    print(cost)
    print("contract")
    print(contract.getEntranceFee())

def main():

    check_value()