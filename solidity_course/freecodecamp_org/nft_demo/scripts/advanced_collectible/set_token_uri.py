from brownie import network, AdvancedCollectible
from scripts.helpful_scripts import OPENSEA_URL, get_account, get_breed

NFT_TOKEN_URI = {

}

def main():
    print(f"Working on {network.show_active()}")
    advanced_collectible = AdvancedCollectible[-1]
    number_of_collect = advanced_collectible.tokenCounter()
    print(f"You have {number_of_collect}!")
    for id in range(number_of_collect):
        breed = get_breed(advanced_collectible.tokenIdToBreed(id))
        if not advanced_collectible.tokenURI(id).startswith('https://'):
            print(f'Setting tokenURI of {id}')
            set_tokenURI(id, advanced_collectible, NFT_TOKEN_URI)
    
def set_tokenURI(id, nft_contract, tokenURI):

    account = get_account()
    tx = nft_contract.set_tokenURI(
        id, 
        tokenURI, 
        {'from': account}
    )
    tx.wait(1)
    print(f'View your NFT at {OPENSEA_URL.format(nft_contract.address, id)}')
    print('Please wait at least 20 mins!')