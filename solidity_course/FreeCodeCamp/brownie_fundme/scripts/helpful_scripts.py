from brownie import network, MockV3Aggregator, config, accounts
from web3 import Web3

DECIMALS = 8
ETHUSD = 200000000000
FORKED_LOCAL_ENVIRONMENT = ["mainnet-fork","mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENT = ["development", "ganache-local"]


def get_account():

    if (network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENT 
    or network.show_active() in FORKED_LOCAL_ENVIRONMENT):

        return accounts[0]
    else:

        return accounts.add(config["wallets"]["from_key"])


def deploy_mocks():

    if len(MockV3Aggregator) <= 0:

        mock_aggregator = MockV3Aggregator.deploy(
            DECIMALS, ETHUSD, {"from": get_account()}
        )
