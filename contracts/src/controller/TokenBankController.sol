pragma solidity ^0.4.2;

import "../aux/ResolverClient.sol";
import "../storage/TokenBankStorage.sol";
import "../aux/Constants.sol";

contract TokenBankController is ResolverClient, Constants {

    function TokenBankController(address _resolver) {
        resolver = _resolver;
        init("c:tbank");
    }

    function registerToken(address _contractaddress, string _name, string _symbol) ifSenderIs("i:tbank") returns (bool _success) {
        _success = TokenBankStorage(getContract("s:tbank")).registerToken(_contractaddress, _name, _symbol);
        return _success;
    }

    function generateDepositAddress(address _user) ifSenderIs("i:tbank") returns (bool _success) {
        _success = TokenBankStorage(getContract("s:tbank")).generateDepositAddress(_user);
        return _success;
    }

    function getDepositAddress(address _user) public constant returns (address _depositaddress) {
        _depositaddress = TokenBankStorage(getContract("s:tbank")).getDepositAddress(_user);
        return _depositaddress;
    }

}
