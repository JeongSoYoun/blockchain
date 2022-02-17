from ctypes import addressof
from scripts.helpful_scripts import get_account
from scripts.get_weth import get_weth
from brownie import network, config, interface
from web3 import Web3

amount = Web3.toWei(0.1, "ether") # 0.1

def main(): 

    account = get_account()
    erc20_address = config['networks'][network.show_active()]['weth_token']

    # Swap ETH into WETH
    if network.show_active() in ['mainnet-fork']:
        get_weth()

    # Deposit into AAVE
    lending_pool = get_lending_pool()
    
    # Approve our ERC20 Token
    approve_erc20(
        amount= amount,
        spender=lending_pool.address,
        erc20_address=erc20_address,
        account=account
    )

    print("Depsit WETH Token")
    tx = lending_pool.deposit(
        erc20_address, 
        amount, 
        account.address, 
        0,
        {"from": account}
    )
    tx.wait(1)
    print("Complete Depsiting WETH Token")

    # How much can we borrow?
    (borrowable_eth, total_debt) = get_borrowable_data(
        lending_pool=lending_pool,
        account=account
    )

    print("Let's borrow!")
    # DAI in terms of ETH
    dai_eth_price = get_asset_price(
        config['networks'][network.show_active()]['dai_eth_price_feed']
    )
    amount_dai_to_borrow = (1/dai_eth_price) * (borrowable_eth * 0.95)
    print(f"We are going to borrow {amount_dai_to_borrow} DAI!")

    # Borrow!
    dai_address = config['networks'][network.show_active()]['dai_token']
    borrow_tx = lending_pool.borrow(

        dai_address,
        Web3.toWei(amount_dai_to_borrow, "ether"),
        1,
        0,
        account.address,
        {"from": account}
    )
    borrow_tx.wait(1)
    print("Borrow some DAI!")
    get_borrowable_data(
        lending_pool=lending_pool,
        account=account
    )

    # repay_all(
    #     amount, 
    #     lending_pool, 
    #     account
    # )
    # print("You've just repaid!")

def repay_all(amount, lending_pool, account):

    approve_erc20(
        Web3.toWei(amount, "ether"), 
        lending_pool,
        config['networks'][network.show_active()]['dai_token'],
        account
    )

    repay_tx = lending_pool.repay(

        config['networks'][network.show_active()]['dai_token'],
        amount,
        1,
        account.address,
        {"from": account}  
    )
    repay_tx.wait(1)
    print("repay!")

def get_asset_price(price_feed_address):

    dai_eth_price_feed = interface.IAggregatorV3Interface(price_feed_address)
    latest_price = dai_eth_price_feed.latestRoundData()[1]
    adjusted_latest_price = Web3.fromWei(latest_price,"ether")

    print(f"DAI/ETH price is {adjusted_latest_price}")
    return float(adjusted_latest_price)



def get_borrowable_data(lending_pool, account): 

    (
        total_collateral_eth,
        total_debt_eth,
        available_borrow_eth,
        current_liquidation_threshold,
        ltv,
        health_factor
    ) = lending_pool.getUserAccountData(account.address)

    available_borrow_eth = Web3.fromWei(available_borrow_eth, "ether")
    total_collateral_eth = Web3.fromWei(total_collateral_eth, "ether")
    total_debt_eth = Web3.fromWei(total_debt_eth, "ether")

    print(f"You have {total_collateral_eth} worth of ETH deposited")
    print(f"You have {total_debt_eth} worth of ETH borrowed")
    print(f"You can borrow {available_borrow_eth} worth of ETH")

    return (float(available_borrow_eth), float(total_debt_eth))

def approve_erc20(amount, spender, erc20_address, account):

    print("Approving ERC20 Token")
    erc20 = interface.IERC20(erc20_address)
    tx = erc20.approve(spender, amount, {"from": account})
    tx.wait(1)
    print("Approved!")

    return tx

def get_lending_pool():

    # Contract -> ABI, Address: Use Interfaces!
    lending_pool_address_provider = interface.ILendingPoolAddressesProvider(

        config['networks'][network.show_active()]['lending_pool_address_provider']
    )
    lending_pool_address = lending_pool_address_provider.getLendingPool()
    lending_pool = interface.ILendingPool(lending_pool_address)

    return lending_pool