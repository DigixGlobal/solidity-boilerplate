pragma solidity ^0.4.2;

import "../ac/ACGroups.sol";


contract ContractResolver is ACGroups {

    mapping (bytes32 => address) contracts;
    event RegisterEvent(bytes32 indexed _contractName, address indexed _contractAddress);
    bool public locked;

    modifier unlessRegistered(bytes32 _key) {
        if (contracts[_key] != 0x0) {
            throw;
        } else {
            _;
        }
    }

    modifier ifOwnerOrigin() {
        if (tx.origin != owner) {
            throw;
        } else {
            _;
        }
    }

    function ContractResolver() {
        owner = msg.sender;
        locked = false;
        groups["admins"].members[msg.sender] = true;
        groups["nsadmins"].members[msg.sender] = true;
    }

    function initRegisterContract(bytes32 _key, address _contractaddress) ifOwnerOrigin() unlessRegistered(_key) returns (bool _success) {
        contracts[_key] = _contractaddress;
        _success = true;
        return _success;
    }

    function lockResolver() ifGroup("nsadmins") returns (bool _success) {
        locked = true;
        _success = true;
        return _success;
    }

    function unlockResolver() ifGroup("nsadmins") returns (bool _success) {
        locked = false;
        _success = true;
        return _success;
    }

    function registerContract(bytes32 _key, address _contract) ifGroup("nsadmins") returns (bool _success) {
        contracts[_key] = _contract;
        _success = true;
        RegisterEvent(_key, _contract);
        return _success;
    }

    function getContract(bytes32 _key) public constant returns (address _contract) {
        if (contracts[_key] == 0x0) {
          throw;
        }
        return contracts[_key];
    }

}
