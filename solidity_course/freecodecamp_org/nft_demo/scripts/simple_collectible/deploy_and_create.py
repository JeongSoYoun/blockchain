
from brownie import SimpleCollectible
from scripts.helpful_scripts import get_account

sample_token_uri = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json"
OPENSEA_URL = "https://testnets.opensea.io/assets/{address}/{tokenID}"

def deploy_and_create():

    account = get_account()
    simple_collectible = SimpleCollectible.deploy({'from': account})
    tx = simple_collectible.createCollectible(sample_token_uri, {'from': account})
    tx.wait(1)

    print(f"You can view your NFT at {OPENSEA_URL.format(address=simple_collectible.address, tokenID=simple_collectible.tokenCounter()-1)}")

    return simple_collectible
    
def main():

    deploy_and_create()