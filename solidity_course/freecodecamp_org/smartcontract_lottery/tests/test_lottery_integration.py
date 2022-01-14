
# test on real-live chain

from scripts.deploy_handler import LOCAL_BLOCKCHAIN_ENVIRONMENTS, fund_with_link, get_account, get_contract
from scripts.deploy_lottery import deploy_lottery
from brownie import network 
import pytest
import time

def test_pick_winner():

    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()
    
    lottery_contract = deploy_lottery()
    account = get_account()
    lottery_contract.startLottery({"from": account})
    lottery_contract.enter({"from": account, "value": lottery_contract.getEntranceFee()})
    lottery_contract.enter({"from": account, "value": lottery_contract.getEntranceFee()})
    lottery_contract.enter({"from": account, "value": lottery_contract.getEntranceFee()})
    fund_with_link(lottery_contract)
    lottery_contract.endLottery({"from": account})
    time.sleep(60)

    assert lottery_contract.winner() == account
    assert lottery_contract.balance() == 0