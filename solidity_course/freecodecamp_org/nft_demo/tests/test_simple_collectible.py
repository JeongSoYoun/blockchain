
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENT, get_account
from scripts.deploy_and_create import deploy_and_create
from brownie import network, accounts 
import pytest 

def test_simple_collectible():

    if network.show_active not in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        pytest.skip()
    
    simple_collectible = deploy_and_create()
    assert simple_collectible.owenerOf(0) == get_account()