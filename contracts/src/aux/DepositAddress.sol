pragma solidity ^0.4.2;

import "../aux/Constants.sol";
import "../aux/Token.sol";
import "../ac/ACGroups.sol";
import "../aux/ResolverClient.sol";

contract Bank {
    function getTokenContractAddressFromSymbol(string _symbol) returns (address _tokencontract); 
}

contract DepositAddress is ACGroups, Constants, ResolverClient {

    function DepositAddress(address _firstauthorized, address _resolver) {
        owner = msg.sender;
        registerAdmin(msg.sender);
        resolver = _resolver;
        addUserToGroup("authorized", msg.sender);
        addUserToGroup("authorized", _firstauthorized);
        isGroupsInit = true;
    }

    function () payable {
    }

    function registerWithdrawalAddress(address _account) ifGroup("admins") returns (bool _success) {
        _success = addUserToGroup("authorized", _account);
        return _success;
    }

    function unregisterWithdrawalAddress(address _account) ifGroup("admins") returns (bool _success) {
        _success = delUserFromGroup("authorized", _account);
        return _success;
    }

    function etherBalance() public constant returns (uint256 _balance) {
        _balance = address(this).balance;
    }

    function tokenBalance(string _tokensymbol) public constant returns (uint256 _balance) {
        address _tokencontract = Bank(getContract("s:tbank")).getTokenContractAddressFromSymbol(_tokensymbol);
        if (_tokencontract == NULL_ADDRESS) {
            _balance = 0;
        } else {
            _balance = Token(_tokencontract).balanceOf(address(this));
        }
        return _balance;
    }

    function tokenAllowanceOf(string _tokensymbol, address _spender) public constant returns (uint256 _remaining) {
        address _tokencontract = Bank(getContract("s:tbank")).getTokenContractAddressFromSymbol(_tokensymbol);
        if (_tokencontract == NULL_ADDRESS) {
            _remaining = 0;
        } else {
            _remaining = Token(_tokencontract).allowance(address(this), _spender);
        }
        return _remaining;
    }

    function tokenApprove(string _tokensymbol, address _spender, uint256 _value) ifGroup("authorized") returns (bool _success) {
        address _tokencontract = Bank(getContract("s:tbank")).getTokenContractAddressFromSymbol(_tokensymbol);
        if (_tokencontract == NULL_ADDRESS) {
            _success = false;
        } else {
            _success = Token(_tokencontract).approve(_spender, _value);
        }
        return _success;
    }

    function tokenWithdraw(string _tokensymbol, address _recipient, uint256 _amount) ifGroup("admins") ifUserIsMemberOf(_recipient, "authorized") returns (bool _success) {
        address _tokencontract = Bank(getContract("s:tbank")).getTokenContractAddressFromSymbol(_tokensymbol);
        if (_tokencontract == NULL_ADDRESS) {
            _success = false;
        } else {
            _success = Token(_tokencontract).transfer(_recipient, _amount);
        }
        return _success;
    }

    function etherWithdraw(address _recipient, uint256 _amount) ifGroup("admins") ifUserIsMemberOf(_recipient, "authorized") returns (bool _success) {
       _success = _recipient.send(_amount); 
       return _success;
    }

    function etherWithdrawWithGas(address _recipient, uint256 _amount, uint256 _gasamount) ifGroup("admins") ifUserIsMemberOf(_recipient, "authorized") returns (bool _success) {
        if (msg.gas < _gasamount) {
            _success = false;
        } else {
            _success = _recipient.call.value(_amount).gas(_gasamount)();
        }
        return _success;
    }

}
