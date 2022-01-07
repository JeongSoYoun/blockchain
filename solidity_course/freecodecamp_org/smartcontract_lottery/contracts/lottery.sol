
// SPDX-Licence-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Lottery {

    address[] public players;
    uint256 public entranceFee;
    AggregatorV3Interface internal ethUSDPriceFeed;

    constructor(address _priceFeedAddress) {

        entranceFee = 50 * (10**18);
        ethUSDPriceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function enter() public payable {

        // minimum 50$ for entrance fee
        players.push(msg.sender);
    }

    function getEntranceFee() public view returns (uint256) {

        (,int price,,,) = ethUSDPriceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * (10**10); // for 18 decimals
        uint256 costToEnter = (entranceFee * 10**18) / adjustedPrice;

        return costToEnter;
    }

    function startLottery() public {}

    function endLottery() public {}
}
