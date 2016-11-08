/* eslint-disable no-undef */
sigmateConfig = require('../config/sigmate_config');
Sigmate = require('../node_modules/@digix/sigmate').default;

module.exports = (deployer) => {
  deployer.deploy(Migrations).then(() => {
    sigmateConfig.deployer = deployer;
    return new Sigmate(sigmateConfig);
  }).then((sigmate) => {
    global.sigmate = sigmate;
    return;
  });
};
