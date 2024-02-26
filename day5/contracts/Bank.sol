//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// CONTRACT TO CONTRACT EXAMPLE
contract Bank{

    mapping(address => uint256) public balances;

    function deposit() public payable {
        //require(tx.origin == msg.sender, "Only EOA can deposit!");
        //require(tx.origin != msg.sender, "Only contracts can deposit!");
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
    /*
    // To block RE-ENTRANCY Attacks
    function withdraw() public {
        uint256 temp = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed to send Ether");
    }
    */
    receive() external payable {
        deposit();
    }

}
