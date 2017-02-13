# Solidity Project Boilerplate

A sample module using Truffle 3.0.

# Usage (via truffle)

```bash
# install project deps
npm i;
# pass sigmate keystore info
export KEYSTORE=`/path/to/eth-lightwallet-keystore.json`;
export PASSWORD='secret';
# start the testrpc server
npm run test-server;
# compile the contracts
npm run truffle -- compile;
npm run truffle -- test --network test;
# for console,
npm run truffle -- migrate --network test;
npm run truffle -- console --network test;
# recompile and run tests on file changes
npm run develop;
# publish to testnet
npm run truffle -- migrate --network ropsten # optional --reset for a full re-deploy
# do not commit `./build/contracts` unless they've got new bytecode (or re-deployed on testnet)
# and before commiting
# also, see http://truffleframework.com/docs/getting_started/packages-npm#before-publishing
npm run truffle -- networks --clean;
```

For more information on truffle CLI, see http://truffleframework.com/docs/advanced/commands.

---

Join our online chat at [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/DigixGlobal/devtools)
