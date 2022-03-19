
from distutils.command.upload import upload
from brownie import AdvancedCollectible, network
from scripts.helpful_scripts import get_breed
from metadata.metadata_template import metadata_template
from pathlib import Path
import requests
import json

def main():

    advanced_collectible = AdvancedCollectible[-1]
    number_of_collect = advanced_collectible.tokenCounter()
    print(f"You have created {number_of_collect} collectibles!")
    
    for token_id in range(number_of_collect):
        breed = get_breed(advanced_collectible.tokenIdToBreed(token_id))
        metadata_file_name = f"./metadata/{network.show_active()}/{token_id}-{breed}.json"
        collectible_metadata = metadata_template
        if Path(metadata_file_name).exists():
            print(f"{metadata_file_name} already exists!")
        else:
            print(f"Creating Metadata File {metadata_file_name}")   
            collectible_metadata['name'] = breed
            collectible_metadata['discription'] = f"An adorable {breed} pup!"
            image_path = "./img/{name}.png".format(name=breed.lower().replace("_","-"))
            image_uri = upload_to_ipfs(image_path)
            collectible_metadata['image'] = image_uri
            with open(metadata_file_name, 'w') as file:
                json.dump(collectible_metadata, file)
            upload_to_ipfs(metadata_file_name)

def upload_to_ipfs(filepath): 
    with Path(filepath).open('rb') as file:
        image_binary = file.read()
        ipfs_url = 'http://127.0.0.1:5001'
        endpoint = '/api/v0/add'
        response = requests.post(ipfs_url + endpoint, files={'file': image_binary})
        ipfs_hash = response.json()['Hash']
        filename = filepath.split('/')[-1:][0]
        image_uri = f'https://ipfs.io/ipfs/{ipfs_hash}?filename={filename}'
        print(image_uri)
        return image_uri


        