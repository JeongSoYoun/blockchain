// SPDX-License-Identifier: MIT
// 1 ETH = 10^10 GWei = 10^18 Wei

pragma solidity >=0.6.6 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;
    address public owner;
    address public senderAddress;
    address public contractAddress;
    uint256 public contractBalance;
    uint256 public senderBalance;
    AggregatorV3Interface public priceFeed;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        owner = msg.sender;
    }

    // msg.sender: address who called function
    function fund() public payable {
        uint256 minimumUSD = 5 * 10**18;
        require(
            convertETHToUSD(msg.value) >= minimumUSD,
            "You need to spend more ETH"
        );

        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        return priceFeed.version();
    }

    function getPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();

        // make to gwei standards
        return uint256(answer * 10**10);

        // 3796180433710000000000
    }

    function convertETHToUSD(uint256 gweiAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountinUSD = (ethPrice * gweiAmount) / 10**18;

        return ethAmountinUSD;
    }

    function getEntranceFee() public view returns (uint256) {
        uint256 minimumUSD = 50 * 10**18;
        uint256 price = getPrice();
        uint256 precision = 1 * 10**18;

        return (minimumUSD * precision) / price;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can withdraw!");
        _;
    }

    function withdraw() public payable onlyOwner {
        // only the contract owner can call this function
        contractAddress = address(this);
        senderAddress = msg.sender;
        payable(msg.sender).transfer(address(this).balance);

        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
    }

    function getFundAmount() public payable {
        contractBalance = address(this).balance;
        senderBalance = addressToAmountFunded[msg.sender];
    }
}
