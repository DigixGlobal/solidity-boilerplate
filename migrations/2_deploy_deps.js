/* eslint-disable no-undef, no-param-reassign */
const DigixMath = require('../node_modules/@digix/math/build/contracts/DigixMath.sol.js');

module.exports = (deployer) => {
  // add DigixMath to known contracts;
  DigixMath.setNetwork(deployer.network_id);
  deployer.known_contracts.DigixMath = DigixMath;
  deployer.deploy(DigixMathTester);
};
