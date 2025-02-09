// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//import "hardhat/console.sol";

contract SanfordToken {
    event Buy(address indexed sender);

    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;

    uint256 public constant CREATION_PRICE = 0.01 ether;
    
    address public immutable boss;

    mapping(address => uint256) public balances;

    struct Vote {
        address voter;
        bool selection;
    }

    Vote[] public votes;

    constructor() {
        //console.log(msg.sender);
        boss = msg.sender;
    }

    modifier onlyBoss() {
        require(msg.sender == boss, "Sorry, not the boss");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    function create(uint256 quantity) public onlyBoss {
        //console.log("--> %s   %s ", quantity, totalCreated );
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }

    function send(address to, uint256 quantity) public {
        require(balances[msg.sender] >= quantity, "You don't have enough token");

        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }

    function buy() public payable {
        // if we put >=, then the buyer might pay more money when the price is changing fast
        require(msg.value == CREATION_PRICE, "Incorrect ETH amount");
        // use >= only when everybody wants to buy and the price is changing with each buy
        require(1 + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += 1;
        totalCreated += 1;

        emit Buy(msg.sender);
    }
    /*
    function buy(uint256 quantity) public {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }
    */
    // This is the only way to withdraw ETH resides in the contract
    function withdraw() public onlyBoss {
        (bool sent, bytes memory data) = boss.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
