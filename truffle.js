const LightWalletProvider = require('@digix/truffle-lightwallet-provider');

const { KEYSTORE, PASSWORD } = process.env;

if (!KEYSTORE || !PASSWORD) { throw new Error('You must export KEYSTORE and PASSWORD (see truffle.js)'); }

module.exports = {
  networks: {
    ropsten: {
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        rpcUrl: 'https://ropsten.infura.io/',
        debug: true,
      }),
      network_id: '3',
    },
    test: {
      // host: 'localhost',
      // port: 6545,
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        prefund: 1e18,
        rpcUrl: 'http://localhost:6545/',
      }),
      network_id: '*',
    },
  },
};
