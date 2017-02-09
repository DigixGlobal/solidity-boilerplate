// imports
const contract = require('../node_modules/truffle-contract');
const data = require('../node_modules/@digix/solidity-core-libraries/build/contracts/MathUtils.json');
const MathUtils = contract(data);
// local contracts
const SampleContract = artifacts.require('./SampleContract.sol');

module.exports = function (deployer) {
  MathUtils.setProvider(deployer.provider);
  MathUtils.setNetwork(deployer.network_id);
  MathUtils.defaults({ from: SampleContract.defaults().from, gas: 3000000 });
  deployer.deploy(MathUtils, { overwrite: false });
  deployer.link(MathUtils, SampleContract);
  deployer.deploy(SampleContract);
};
