import Sigmate from '@digix/sigmate';
import Contest from '@digix/contest';
import * as testPaths from './tests';

const tests = testPaths.all;
import sigmateConfig from '../config/sigmate_config';

global.contest = new Contest({ debug: false });

// determine network

contract('Truffle', function () {
  it('is ready', function () {
    return new Sigmate({
      ...sigmateConfig,
      web3,
    }).then((sigmate) => {
      Object.keys(tests).forEach((key) => tests[key](sigmate));
    });
  });
});
