pragma solidity ^0.4.4;

import "@digix/math/contracts/DigixMath.sol";

contract DigixMathTester {
  function testing () returns (bool success) {
    return DigixMath.safeToAdd(1, 3);
  }
}
