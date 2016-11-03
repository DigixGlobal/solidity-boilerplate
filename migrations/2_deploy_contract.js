/* eslint-disable */

const contractParams = require('../config/contract_params');

// TODO use sigmate for deployment

module.exports = (deployer) => {
  const params = contractParams.MyToken;
  if (!params) { throw 'MyToken params not configured'; }
  deployer.deploy(MyToken, [
    params._initialAmount, params._tokenName, params._decimalUnits, params._tokenSymbol
  ]);
};
