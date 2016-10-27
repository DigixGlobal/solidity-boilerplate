pragma solidity ^0.4.2;


contract ACSimpleMutex {

    mapping (bytes32 => bool) slocks;
    
    modifier ifSimpleMutexLocked(bytes32 _mId) {
        if (!isSimpleMutexLocked(_mId)) {
            throw;
        } else {
            _;
        }
    }
    
    modifier unlessSimpleMutexLocked(bytes32 _mId) {
        if (isSimpleMutexLocked(_mId)) {
            throw;
        } else {
            _;
        }
    }

    function simpleMutexLock(bytes32 _mutexId) private returns (bool _success) {
        slocks[_mutexId] = true;
        _success = true;
        return _success;
    }
    
    function simpleMutexUnlock(bytes32 _mutexId) private returns (bool _success) {
        slocks[_mutexId] = false;
        _success = true;
        return _success;
    }
    
    function isSimpleMutexLocked(bytes32 _mutexId) public constant returns (bool _locked) {
        _locked = slocks[_mutexId];
        return _locked;
    }

}
