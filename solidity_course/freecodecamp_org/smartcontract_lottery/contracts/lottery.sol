
// SPDX-Licence-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is VRFConsumerBase, Ownable {

    address payable[] public players;
    address payable public winner;
    uint256 public entranceFee;
    uint256 public randomness;
    AggregatorV3Interface internal eth_usd_price;
    enum LOTTERY_STATE {

        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }
    LOTTERY_STATE public lottery_state;
    uint256 public fee; 
    bytes32 public keyhash;
    event RequestedRandomness(bytes32 requestId);

    constructor (
        
        address _priceFeedAddress, 
        address _vrfCoordinator, 
        address _link, 
        uint256 _fee, 
        bytes32 _keyhash
    ) 
    
    VRFConsumerBase(_vrfCoordinator, _link) {

        entranceFee = 5 * (10**18);
        eth_usd_price = AggregatorV3Interface(_priceFeedAddress);
        lottery_state = LOTTERY_STATE.CLOSED;
        fee = _fee;
        keyhash = _keyhash;
    }

    function enter() public payable {

        // minimum 50$ for entrance fee
        require(lottery_state == LOTTERY_STATE.OPEN, "Lottery has been closed");
        require(msg.value >= getEntranceFee(), "Require more ETH to enter the game!");
        players.push(payable(msg.sender));
    }

    function getEntranceFee() public view returns (uint256) {

        (,int price,,,) = eth_usd_price.latestRoundData();
        // for 18 decimals -> convert to wei standard
        uint256 adjustedPrice = uint256(price) * (10**10); 
        uint256 costToEnter = (entranceFee * 10**18) / adjustedPrice;

        return costToEnter;
    }

    function startLottery() public onlyOwner {

        require(lottery_state == LOTTERY_STATE.CLOSED, "Not yet started!");
        lottery_state = LOTTERY_STATE.OPEN;
    }

    function endLottery() public onlyOwner {

        lottery_state = LOTTERY_STATE.CALCULATING_WINNER;
        bytes32 requestId = requestRandomness(keyhash, fee); // request data on ChainLink Oracle
        
        emit RequestedRandomness(requestId);
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {

        require(lottery_state == LOTTERY_STATE.CALCULATING_WINNER, "You aren't there yet!");
        require(_randomness > 0, "Random Number not calcutated yet!");

        uint256 indexOfWinner = _randomness % players.length;
        winner = players[indexOfWinner];
        winner.transfer(address(this).balance);

        players = new address payable[](0);
        lottery_state = LOTTERY_STATE.CLOSED;
        randomness = _randomness;
    }

    function getPrice() public view returns(uint256,uint256) {

        (,int price,,,) = eth_usd_price.latestRoundData();

        return (entranceFee,uint256(price));
    }
}
