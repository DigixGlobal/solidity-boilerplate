pragma solidity ^0.4.2;

import '../src/StandardToken.sol';

contract TestStandardToken is StandardToken {

  function TestStandardToken(uint256 _initialAmount) {
    balances[msg.sender] = _initialAmount;     // Give the creator all initial tokens
  }
}
