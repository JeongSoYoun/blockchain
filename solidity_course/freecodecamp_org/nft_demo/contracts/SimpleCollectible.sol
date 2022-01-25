
// SPDX-License-Identifier: MIT

pragma solidity >0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SimpleCollectible is ERC721URIStorage {

    uint256 public tokenCounter;

    constructor() ERC721("doge","dog") {
        tokenCounter = 0;
    }

    function createCollectible(string memory tokenURI) public returns (uint256) {

        uint256 newItemID = tokenCounter;
        _safeMint(msg.sender, newItemID);
        _setTokenURI(newItemID, tokenURI);
        tokenCounter = tokenCounter + 1;

        return newItemID;
    }
}