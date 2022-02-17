from brownie import CreateRandomNumber, network, config
from scripts.helpful_scripts import get_account, fund_link_to_contract, get_contract
import time 

def deploy_randomness():

    account = get_account()
    print(account)
    randomness_contract = CreateRandomNumber.deploy(
        
        get_contract(contract_name='vrf_coordinator'),
        get_contract(contract_name='link_token'),
        config['networks'][network.show_active()]['key_hash'],
        config['networks'][network.show_active()]['fee'],
        {"from": account}
    )

    fund_link_to_contract(contract_address=randomness_contract)
    randomness_contract.getRandomNumber({'from': account})
    print("getting random number")
    time.sleep(60)
    print(f"Random Number is {randomness_contract.randomNumber()}")

def main(): 

    deploy_randomness()