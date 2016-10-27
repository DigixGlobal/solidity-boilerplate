pragma solidity ^0.4.2;


contract ACState {

    mapping (bytes32 => uint256) states;

    modifier ifState(bytes32 _key, uint8 _state) {

        if (states[_key] != _state) {
            throw;
        } else {
            _;
        }
    }

    modifier unlessState(bytes32 _key, uint8 _state) {
        if (states[_key] == _state) {
            throw;
        } else {
            _;
        }
    }

    function setState(bytes32 _key, uint8 _state) private returns (bool _success) {
        states[_key] = _state;
        _success = true;
        return _success;
    }
    
}
