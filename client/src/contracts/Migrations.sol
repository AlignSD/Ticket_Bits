// SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity ^0.5.0
=======
pragma solidity ^0.5.0;
>>>>>>> 1b8a9f7027757604ba7693b77ce1ea6fc4f1843a

contract Migrations {
    address public owner;
    uint256 public last_completed_migration;

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
