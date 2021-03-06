
//SPDX-License-Identifier:MIT
pragma solidity >0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract CreateRandomNumber is VRFConsumerBase {

    uint256 public randomNumber;
    bytes32 internal keyhash;
    uint256 internal fee;

    constructor(
        address _vrfcoordinator,
        address _linkToken,
        bytes32 _keyhash,
        uint256 _fee
    ) VRFConsumerBase(_vrfcoordinator, _linkToken){

        keyhash = _keyhash;
        fee = _fee;
    }

    function getRandomNumber() public returns (bytes32 requestId) {

        require(LINK.balanceOf(address(this)) >= fee, "Not enough link for this contract");
        return requestId = requestRandomness(keyhash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) 
        internal
        override {

            randomNumber = randomness;
    }
} 