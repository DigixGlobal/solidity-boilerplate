pragma solidity ^0.4.2;

import "../aux/ResolverClient.sol";
import "../controller/TokenBankController.sol";


contract TokenBankInterface is ResolverClient {

    function TokenBankInterface(address _resolver) {
        resolver = _resolver;
        init("i:tbank");
    }


    function generateDepositAddress(address _user) returns (bool _success) {
        _success = TokenBankController(getContract("c:tbank")).generateDepositAddress(_user);
        return _success;
    }

    function getDepositAddress(address _user) public constant returns (address _depositaddress) {
        _depositaddress = TokenBankController(getContract("c:tbank")).getDepositAddress(_user);
        return _depositaddress;
    }
}
