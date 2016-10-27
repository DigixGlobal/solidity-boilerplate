module.exports = {
  networks: {
    live: {
      network_id: 1, // Ethereum public network
      // optional config values
      // host - defaults to 'localhost'
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    morden: {
      network_id: 2,        // Official Ethereum test network
      host: '172.16.47.10', // Random IP for example purposes (do not use)
      port: 8545,
    },
    staging: {
      network_id: 1337, // custom private network
      // use default rpc settings
    },
    test: {
      // spawnTestRpc: true,
      port: 6545,
    },
    development: {
      network_id: 'default',
      port: 6545,
    },
  },
};
