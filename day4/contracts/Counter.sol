// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint public count;
    address public boss; // owner is not a special keyword!

    constructor(uint256 _initialCount) {
        count = _initialCount;
        boss = msg.sender;

    }

    modifier onlyBoss() {
        require(msg.sender == boss, "Sorry, not the boss");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    function get() public view returns (uint) {
        return count;
    }

    function inc() public {
        count += 1;
    }

    function superInc() public {
        count += 10;
    }

    function dec() public onlyBoss{
        count -= 1;
    }
    /* ALTERNATIVE WAY
    function dec() public {
        require(msg.sender == boss, "Sorry, not the boss");
        count -= 1;
    }
    */
}
