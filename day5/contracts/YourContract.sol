//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

 // DAY4 PROJECT WITH SCAFFOLD-ETH USE
contract YourContract is Ownable{
	event Buy(address indexed sender);

    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;
    uint256 public constant CREATION_PRICE = 0.01 ether;
    
    mapping(address => uint256) public balances;

    struct Vote {
        address voter;
        bool selection;
    }
    Vote[] public votes;

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor() {
		// Transfer the ownership to your address to call functions which require ownership
		transferOwnership(0x892Bf346cef11461eEFf8CD67B7F234C8F35630F);
	}

	function create(uint256 quantity) public onlyOwner {
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

    // This is the only way to withdraw ETH resides in the contract
    function withdraw() public {
        (bool sent, bytes memory data) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

	// Function that allows the contract to receive ETH
	receive() external payable {}
}
