const config = require('../config/contract_params');

module.exports = (deployer) => {
  const { users, contracts } = global.sigmate;
  return deployer.deploy(
    contracts.MyToken,
    config.MyToken._initialAmount,
    config.MyToken._tokenName,
    config.MyToken._decimalUnits,
    config.MyToken._tokenSymbol,
    { from: users.deployer }
  );
};
