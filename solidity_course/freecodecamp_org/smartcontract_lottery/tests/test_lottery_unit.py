
from brownie import Lottery, network, accounts, config, exceptions
from scripts.deploy_lottery import deploy_lottery
from scripts.deploy_handler import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account, fund_with_link
from web3 import Web3
import pytest

def test_get_entrance_fee():   

    # if not in local block chain, skip test
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    # Arrange
    contract = deploy_lottery()

    # Act
    expected_entrance_fee = Web3.toWei(0.025, "ether")
    entrance_fee = contract.getEntranceFee()

    # Assert
    assert expected_entrance_fee == entrance_fee

def test_enter():

    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    contract = deploy_lottery()
    with pytest.raises(exceptions.VirtualMachineError):

        contract.enter({"from": get_account(), "value": contract.getEntranceFee()})

def test_start_enter_lottery():

    # arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    contract = deploy_lottery()
    account = get_account()
    contract.startLottery({"from": account})

    # act
    contract.enter({"from": account, "value": contract.getEntranceFee()})

    # assert
    assert contract.players(0) == account

def test_end_lottery():

    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    contract = deploy_lottery()
    account = get_account()
    contract.startLottery({"from": account})
    contract.enter({"from": account, "value": contract.getEntranceFee()})
    fund_with_link(contract)
    contract.endLottery({"from": account})
    
    assert contract.lottery_state() == 2

