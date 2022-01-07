
from brownie import Lottery, network, accounts, config
from web3 import Web3

def test_entranceFree():   

    account = accounts[0]
    contract = Lottery.deploy(
                
        config["networks"][network.show_active()]["eth_usd_price_feed"],
        {"from": account}
    )

    assert contract.getEntranceFee() > Web3.toWei(0.015, "ether")
    assert contract.getEntranceFee() < Web3.toWei(0.02, "ether")
