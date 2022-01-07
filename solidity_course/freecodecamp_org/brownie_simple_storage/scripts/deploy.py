from brownie import accounts, SimpleStorage, network, config


def deploy_simple_storage():

    account = get_account()
    print(account)
    simple_storage = SimpleStorage.deploy({"from": account})
    simple_storage.retrieve()
    simple_storage.store(15, {"from": account})
    simple_storage.retrieve()


def get_account():

    if network.show_active() == "development":

        return accounts[0]
    else:

        return accounts.add(config["wallets"]["from_key"])


def main():

    deploy_simple_storage()
