
from brownie import Lottery, config, network, accounts

def check_value():

    account = accounts[0]
    contract = Lottery.deploy(

        config["networks"][network.show_active()]["eth_usd_price_feed"],
        {"from": account}
    )

    print(contract.getEntranceFee())

def main():

    check_value()