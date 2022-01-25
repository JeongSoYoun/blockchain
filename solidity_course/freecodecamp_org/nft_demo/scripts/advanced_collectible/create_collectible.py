from brownie import AdvancedCollectible
from scripts.helpful_scripts import fund_link_to_contract, get_account
from web3 import Web3

def main():

    account = get_account()
    advanced_collectible = AdvancedCollectible[-1]
    fund_link_to_contract(advanced_collectible)
    tx = advanced_collectible.createCollectible({"from": account})
    tx.wait(1)
    print("Collectible created!")

