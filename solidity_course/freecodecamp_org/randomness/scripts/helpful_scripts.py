from brownie import accounts, network, config, LinkToken, VRFCoordinatorMock, Contract
from web3 import Web3

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ['development', 'gananche', 'mainnet-fork']

TYPE = {
    "link_token": LinkToken, 
    "vrf_coordinator": VRFCoordinatorMock
}

def get_account(index=None, id=None):

    if index:
        return accounts[index]
    elif id:
        return accounts.load(id)
    elif network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]

    return accounts.add(config['wallets']['from_key'])

def get_contract(contract_name: str):

    contract_type = TYPE[contract_name]
    contract_address = config["networks"][network.show_active()][contract_name]
    contract = Contract.from_abi(
        contract_type._name,
        contract_address,
        contract_type.abi
    )

    return contract

def fund_link_to_contract(
    contract_address,
    account=None,
    link_token=None,
    amount=Web3.toWei(0.1, 'ether')
):

    account = account if account else get_account()
    link_token = link_token if link_token else get_contract(contract_name='link_token')
    funding_tx = link_token.transfer(contract_address, amount, {'from': account})
    funding_tx.wait(1)
    print(f'Fund link token to contract {contract_address}')




    