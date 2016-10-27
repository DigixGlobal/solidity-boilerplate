pragma solidity ^0.4.2;

import "../aux/Constants.sol";

contract ACConditions is Constants {
   
    modifier notNullAddress(address _item) {
        if (_item == NULL_ADDRESS) {
            throw;
        } else {
            _;
        }
    }

    modifier ifNullAddress(address _item) {
        if (_item != NULL_ADDRESS) {
            throw;
        } else {
            _;
        }
    }

    modifier notNullUint(uint256 _item) {
        if (_item == NONE) {
            throw;
        } else {
            _;
        }
    }

    modifier ifNullUint(uint256 _item) {
        if (_item != NONE) {
            throw;
        } else {
            _;
        }
    }

    modifier notNullBytes(bytes32 _item) {
        if (_item == EMPTY) {
            throw;
        } else {
            _;
        }
    }

    modifier ifNullBytes(bytes32 _item) {
        if (_item != EMPTY) {
            throw;
        } else {
            _;
        }
    }

    modifier notNullString(string _item) {
        bytes memory _i = bytes(_item);
        if (_i.length == 0) {
            throw;
        } else {
            _;
        }
    }

    modifier ifNullString(string _item) {
        bytes memory _i = bytes(_item);
        if (_i.length != 0) {
            throw;
        } else {
            _;
        }
    }

    modifier requireGas(uint256 _requiredgas) {
        if (msg.gas < _requiredgas) {
            throw;
        } else {
            _;
        }
    }

}
