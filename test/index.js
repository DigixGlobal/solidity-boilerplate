import Sigmate from '@digix/sigmate';
import Tempo from '@digix/tempo';
import Contest from '@digix/contest';

global.contest = new Contest({ debug: false });

import testDigixMath from './unittest/lib/DigixMath';

contract('SolidityBoilerplate', () => {
  before(function (done) {
    new Sigmate({
      accounts: {
        primary: true,
        secondary: true,
        tertiary: true,
      },
      fundAccounts: 1e18 * 3, // 3 eth
      label: 'solidity-boilerplate',
      web3,
    }).then((sigmate) => {
      global.contracts = sigmate.contracts;
      global.accounts = sigmate.accounts;
      global.web3 = sigmate.web3;
      return new Tempo(web3);
    }).then((tempo) => {
      global.tempo = tempo;
      done();
    });
  });

  it('is ready', function () {
    assert.ok(contracts);
    testDigixMath();
  });
});
