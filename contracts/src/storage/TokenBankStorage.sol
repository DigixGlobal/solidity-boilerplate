pragma solidity ^0.4.2;

import "../ac/ACConditions.sol";
import "../aux/ResolverClient.sol";
import "../aux/DepositAddress.sol";

contract TokenBankStorage is ResolverClient, ACConditions {

    struct Token {
        address contractAddress;
        string symbol;
        string name;
    }

    mapping (address => address) depositAddresses;

    mapping (string => Token) symbolIndex;

    modifier unlessRegistered(string _sym) {
        if (symbolIndex[_sym].contractAddress != NULL_ADDRESS) {
            throw;
        } else {
            _;
        }
    }

    function TokenBankStorage(address _resolver) {
        resolver = _resolver;
        init("s:tbank");
    }

    function registerToken(address _contractaddress, string _name, string _symbol) ifSenderIs("c:tbank") notNullAddress(_contractaddress) notNullString(_symbol) notNullString(_name) unlessRegistered(_symbol) returns (bool _success) {
       symbolIndex[_symbol].contractAddress = _contractaddress;
       symbolIndex[_symbol].symbol = _symbol;
       symbolIndex[_symbol].name = _name;
       _success = true;
       return _success;
    }

    function generateDepositAddress(address _user) ifSenderIs("c:tbank") notNullAddress(_user) returns (bool _success) {
        if (depositAddresses[_user] != NULL_ADDRESS) {
            depositAddresses[_user] = new DepositAddress(_user, resolver);
        }
        _success = true;
        return _success;
    }

    function getDepositAddress(address _user) public constant returns (address _depositaddress) {
        _depositaddress = depositAddresses[_user];
        return _depositaddress;
    }

	function getTokenContractAddressFromSymbol(string _symbol) public constant returns (address _contractaddress) {
		_contractaddress = symbolIndex[_symbol].contractAddress;
		return _contractaddress;	
	}

}
