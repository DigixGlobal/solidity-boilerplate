const sigmate = require('./node_modules/@digix/sigmate');

module.exports = sigmate.truffle({
  imports: [
    './node_modules/@digix/math/build/contracts/DigixMath.sol.js',
  ],
  networks: {
    testnet: sigmate.config({
      network_id: '3',
      rpcUrl: 'https://ropsten.infura.io/rI8j2sgqOpz0VSkIPv7u',
      gas: 3000000,
      keystore: {
        label: 'testing',
        password: 'testing',
      },
    }),
    test: sigmate.config({
      network_id: 'default',
      rpcUrl: 'http://localhost:6545',
      keystore: {
        label: 'testing',
        password: 'testing',
      },
    }),
  },
});
