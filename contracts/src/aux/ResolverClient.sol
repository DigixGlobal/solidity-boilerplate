pragma solidity ^0.4.2;

import "./ContractResolver.sol";

contract ResolverClient {

  address public resolver;
  address public constant CONTRACT_ADDRESS = address(this);

  modifier ifSenderIs(bytes32 _contract) {
    if (msg.sender != ContractResolver(resolver).getContract(_contract)) {
      throw;
    } else {
      _;
    }
  }

  modifier unlessResolverIsLocked() {
    if (isLocked()) {
      throw;
    } else {
      _;
    }
  }

  function init(bytes32 _key) internal returns (bool _success) {
    _success = ContractResolver(resolver).initRegisterContract(_key, CONTRACT_ADDRESS);
    return _success;
  }

  function isLocked() public constant returns (bool _locked) {
    _locked = ContractResolver(resolver).locked();
    return _locked;
  }

  function getContract(bytes32 _key) public constant returns (address _contract) {
    _contract = ContractResolver(resolver).getContract(_key);
    return _contract;
  }
}
