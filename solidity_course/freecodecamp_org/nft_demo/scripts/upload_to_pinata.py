import os
from dotenv import load_dotenv
from pathlib import Path
import requests

load_dotenv
PINATA_API_KEY = os.getenv('PINATA_API_KEY')
PINATA_API_SECRET = os.getenv('PINATA_API_SECRET')
print(PINATA_API_KEY)
print(PINATA_API_SECRET)
PINATA_BASE_URL = 'https://api.pinata.cloud'
ENDPOINT = '/pinning/pinFileToIPFS'
FILEPATH = './img/pug.png'
FILENAME = FILEPATH.split('/')[-1:][0]
headers = {
    'pinata_api_key': PINATA_API_KEY, 
    'pinata_secret_api_key': PINATA_API_SECRET
}

def main():

    with Path(FILEPATH).open('rb') as file:
        image_binary = file.read()
        response = requests.post(
            PINATA_BASE_URL + ENDPOINT, 
            files={'file': (FILENAME, image_binary)},
            headers=headers
        )
        print(response.json())