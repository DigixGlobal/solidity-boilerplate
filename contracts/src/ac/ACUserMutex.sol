pragma solidity ^0.4.2;


contract ACUserMutex {

    mapping (bytes32 => bool) umlocks;

    modifier ifUserMutexLocked(bytes32 _mId) {
        if (!isUserMutexLocked(_mId)) {
            throw;
        } else {
            _;
        }
    }

    modifier unlessUserMutexLocked(bytes32 _mId) {
        if (isUserMutexLocked(_mId)) {
            throw;
        } else {
            _;
        }
    }

    function userMutexLock(bytes32 _mutexId) private returns (bool _success) {
        bytes32 _key = sha3(msg.sender, _mutexId);
        umlocks[_key] = true;
        _success = true;
        return _success;
    }
    
    function userMutexUnlock(bytes32 _mutexId) private returns (bool _success) {
        bytes32 _key = sha3(msg.sender, _mutexId);
        umlocks[_key] = true;
        _success = true;
        return _success;
    }
    
    function isUserMutexLocked(bytes32 _mutexId) public constant returns (bool _locked) {
        bytes32 _key = sha3(msg.sender, _mutexId);
        _locked = umlocks[_key];
        return _locked;
    }

}
