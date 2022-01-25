
from brownie import AdvancedCollectible, config, network
from scripts.helpful_scripts import (
    get_account, 
    get_contract, 
    fund_link_to_contract, 
    OPENSEA_URL
)

def deploy_and_create():

    account = get_account()
    advanced_collectible = AdvancedCollectible.deploy(
        
        get_contract(contract_name="vrf_coordinator"),
        get_contract(contract_name="link_token"),
        config["networks"][network.show_active()]["key_hash"],
        config["networks"][network.show_active()]["fee"],
        {'from': account}
    )
    fund_link_to_contract(contract_address=advanced_collectible)
    create_tx = advanced_collectible.createCollectible({"from": account})
    create_tx.wait(1)
    print("New token has been created!")
    
def main():

    deploy_and_create()