
// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract AdvancedCollectible is ERC721URIStorage, VRFConsumerBase {

    uint256 public tokenCounter;
    bytes32 public keyhash;
    uint256 public fee;
    mapping(uint256 => Breed) public tokenIdToBreed;
    mapping(bytes32 => address) public requestIdToSender;
    event requestedCollectible(bytes32 indexed requestId, address requester);
    event breedAssigned(uint256 indexed tokenId, Breed breed);
    enum Breed{
        PUG, 
        SHIBA_INU, 
        ST_BERNARD
    }
    
    constructor(
        address _vrfCoordinator, 
        address _linkToken, 
        bytes32 _keyhash, 
        uint256 _fee) 
    VRFConsumerBase(_vrfCoordinator, _linkToken) 
    ERC721("DOGE","DOG")
    {
        tokenCounter = 0;
        keyhash = _keyhash;
        fee = _fee;
    }

    function requestRandomNumber() 
        public 
        returns(bytes32) {

            bytes32 requestId = requestRandomness(keyhash, fee);
            requestIdToSender[requestId] = msg.sender;
            emit requestedCollectible(requestId, msg.sender);

            return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal override {
        
        Breed breed = Breed(randomNumber % 3);
        uint256 newTokenId = tokenCounter;
        tokenIdToBreed[newTokenId] = breed;
        emit breedAssigned(newTokenId, breed);
        address owner = requestIdToSender[requestId];
        _safeMint(owner, newTokenId);
        tokenCounter += 1;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {

        // need 3 tokenURI for 3 dog images
        require(
            _isApprovedOrOwner(
                _msgSender(), 
                tokenId
            ),
            "ERC721: caller is not owner or approved!"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}