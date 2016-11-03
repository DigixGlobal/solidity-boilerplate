import Sigmate from '@digix/sigmate';
import Contest from '@digix/contest';
import * as testPaths from './tests';

const tests = testPaths.all;

global.contest = new Contest({ debug: true });

contract('Truffle', function () {
  it('is ready', function () {
    return new Sigmate({
      count: 4,
      prefund: 1e18 * 3, // 3 eth each
      label: 'solidity-boilerplate',
      web3,
    }).then((res) => {
      Object.keys(tests).forEach((key) => tests[key](res));
    });
  });
});
