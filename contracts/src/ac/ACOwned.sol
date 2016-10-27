pragma solidity ^0.4.2;

contract ACOwned {

    address public owner;
    
    modifier ifOwner() {
        if (owner != msg.sender) {
            throw;
        } else {
            _;
        }
    }

}
