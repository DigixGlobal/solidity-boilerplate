pragma solidity ^0.4.2;

import "./StandardToken.sol";

/// @title "MyToken" ERC20 Token
/// @author Author Name Here
contract MyToken is StandardToken {

  function () {
    //if ether is sent to this address, send it back.
    throw;
  }

  /*
  NOTE:
  The following variables are OPTIONAL vanities. One does not have to include them.
  They allow one to customise the token contract & in no way influences the core functionality.
  Some wallets/interfaces might not even bother to look at this information.
  */
  string public name;                    // fancy name: eg Cool Cat Tokens
  uint8 public decimals;                 // How many decimals to show. ie. There could 1000 base units with 3 decimals.
  string public symbol;                  // An identifier: eg CCT
  string public version = 'EIP20_0.0.1'; // Just an arbitrary versioning scheme.

  // constructor
  function MyToken(uint256 _initialAmount, string _tokenName, uint8 _decimalUnits, string _tokenSymbol) {
    balances[msg.sender] = _initialAmount;     // Give the creator all initial tokens
    totalSupply = _initialAmount;              // Update total supply
    name = _tokenName;                         // Set the name for display purposes
    decimals = _decimalUnits;                  // Amount of decimals for display purposes
    symbol = _tokenSymbol;                     // Set the symbol for display purposes
  }
}
