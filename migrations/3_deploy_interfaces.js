/* eslint-disable no-undef */

module.exports = (deployer) => {
  deployer.deploy([
    [TokenBankStorage, ContractResolver.address],
  ]);
  deployer.deploy([
    [TokenBankController, ContractResolver.address],
  ]);
  deployer.deploy([
    [TokenBankInterface, ContractResolver.address],
  ]);
};
