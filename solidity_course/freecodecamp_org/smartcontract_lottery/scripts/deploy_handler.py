
from brownie import (
    network, 
    accounts, 
    config, 
    Contract, 
    MockV3Aggregator, 
    VRFCoordinatorMock,
    LinkToken
)

FORKED_LOCAL_ENVIRONMENTS = ["mainnet-fork"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]
DECIMALS = 8
ETH_USD_PRICE = 200000000000 # 2000 USD

def get_account(index = None, id = None):

    if index:

        return accounts[index]

    if id:

        return accounts.load(id)
 
    if(
        network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS or
        network.show_active() in FORKED_LOCAL_ENVIRONMENTS
    ):

        return accounts[0]

    return accounts.add(config["wallets"]["from_key"])

contract_to_mock = {

    "eth_usd_price_feed": MockV3Aggregator,
    "vrf_coordinator": VRFCoordinatorMock,
    "link_token": LinkToken
}

def get_contract(contract_name): 
    
    """
        This function will grab the contract addresses from the brownie config
        Otherwise, it will deploy a mock version of that contract 
        Finally, Return the mock contract

        Args:
            contract_name: String

        Return:
            The most recently deployed version of this contract.
    """

    contract_type = contract_to_mock[contract_name]  
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:

        # deploy only once.
        if len(contract_type) <= 0:
            
            deploy_mock_contract()

        mock_contract = contract_type[-1]

    else:

        contract_address = config["networks"][network.show_active()][contract_name]

        mock_contract = Contract.from_abi(

            contract_type._name, 
            contract_address, 
            contract_type.abi
        )

    return mock_contract 

def deploy_mock_contract(decimals=DECIMALS, initial_value=ETH_USD_PRICE):

    account = get_account()
    MockV3Aggregator.deploy(

        decimals, 
        initial_value, 
        {"from": account}
    )
    linktoken_contract = LinkToken.deploy({"from": account})
    VRFCoordinatorMock.deploy(linktoken_contract.address, {"from": account})

    print("mock deployed!")

def fund_with_link(contract_address, account=None, link_token=None, amount=100000000000000000):

    """
        amount: 0.1 Link
    """
    account = account if account else get_account()
    link_token_contract = link_token if link_token else get_contract("link_token")
    tx = link_token_contract.transfer(contract_address, amount, {"from": account})
    # link_token_contract = interface.LinkTokenInterface(link_token.address)
    # tx = link_token_contract.transfer(contract_address, amount, {"from": account})
    tx.wait(1)

    print("Fund with Link to contract!")
    return tx