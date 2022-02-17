
from brownie import (
    accounts, 
    network, 
    config, 
    Contract, 
    LinkToken, 
    VRFCoordinatorMock
)

from web3 import Web3

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ['development', 'gananche', 'mainnet-fork']
OPENSEA_URL = "https://testnets.opensea.io/assets/{address}/{tokenID}"

contract_to_mock = {
    "link_token": LinkToken, 
    "vrf_coordinator": VRFCoordinatorMock
}

BREED_MAPPING = {0: "PUG", 1: "SHIBA_INU", 2: "ST_BERNARD"}
def get_breed(breed_number):

    return BREED_MAPPING[breed_number]
    
def get_account(index=None, id=None): 

    if index:
        return accounts[index]
    elif network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    elif id:
        return accounts.load(id)
    return accounts.add(config['wallets']['from_key'])

def get_contract(contract_name):

    contract_type = contract_to_mock[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks()    
        contract = contract_type[-1]
    else:
        contract_address = config["networks"][network.show_active()][contract_name]
        contract = Contract.from_abi(
            contract_type._name,
            contract_address,
            contract_type.abi
        )

    return contract

def deploy_mocks():

    print("You're deploying mocks...")
    print(f"Network now: {network.show_active()}")
    account = get_account()
    print("Deploying Mock LinkToken")
    link_token = LinkToken.deploy({"from": account})
    print(f"Link Token contract deployed to {link_token.address}")
    print("Deploying Mock VRFCoordinator")
    vrf_coordinator = VRFCoordinatorMock.deploy(
        link_token.address,
        {"from": account}
    )
    print(f"VRFCoordinator Mock deployed to {vrf_coordinator.address}")

def fund_link_to_contract(
    contract_address, 
    account=None, 
    link_token=None, 
    amount=Web3.toWei(0.1, "ether")
):

    account = account if account else get_account()
    link_token = link_token if link_token else get_contract(contract_name="link_token")
    funding_tx = link_token.transfer(contract_address, amount, {"from": account})
    funding_tx.wait(1)
    print(f"Funded Link to {contract_address}!")

    return funding_tx
