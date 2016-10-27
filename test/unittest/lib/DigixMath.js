import log from '../../helpers/logger';
import { asyncIterator } from '../../helpers/async';
import { randomInt } from '../../helpers/random';
import { BIG_INT, BIG_INT_MINUS_TWO, ONE_DAY_IN_SECONDS } from '../../helpers/constants';

export default function () {
  describe('DigixMath', function () {
    this.timeout(1000);

    const testContract = contracts.DigixMath.deployed();

    describe('safeToAdd', function () {
      contest.assert(testContract.safeToAdd, 'returns the correct bool', [
        [[1, 2], true],
        [[2, 12], true],
        [[0, 0], true],
        [[BIG_INT_MINUS_TWO, 2], true],
        [[BIG_INT_MINUS_TWO, 3], false],
        [[BIG_INT, BIG_INT], false],
        [[BIG_INT, 3], false],
      ]);
    });

    describe('safeAdd', function () {
      contest.assert(testContract.safeAdd, 'adds the integers correctly', [
        [[10, 2], 12],
        [[2, 3], 5],
        [[1024, 1024], 2048],
        [[BIG_INT_MINUS_TWO, 2], BIG_INT.toNumber()],
      ], (res) => res.toNumber());
      contest.throw(testContract.safeAdd, 'throws when trying to add unsafe ints', [
        [BIG_INT, 2],
        [BIG_INT_MINUS_TWO, 3],
        [BIG_INT, BIG_INT],
      ]);
    });

    describe('safeToSubtract', function () {
      contest.assert(testContract.safeToSubtract, 'returns the correct bool', [
        [[2, 1], true],
        [[BIG_INT, 1], true],
        [[BIG_INT, BIG_INT], true],
        [[BIG_INT, BIG_INT_MINUS_TWO], true],
        [[2, BIG_INT_MINUS_TWO], false],
        [[3, BIG_INT], false],
        [[3, 5], false],
      ]);
    });

    describe('safeSubtract', function () {
      contest.assert(testContract.safeSubtract, 'subtracts the integers correctly', [
        [[10, 2], 8],
        [[50, 8], 42],
        [[2048, 1024], 1024],
        [[BIG_INT, BIG_INT_MINUS_TWO], 2],
      ], (res) => res.toNumber());
      contest.throw(testContract.safeSubtract, 'throws when trying to subtract unsafe ints', [
        [2, BIG_INT_MINUS_TWO],
        [BIG_INT_MINUS_TWO, BIG_INT],
      ]);
    });

    describe('rateOf', function () {
      function inputs(n) {
        return Array.apply(null, { length: n }).map(() => {
          const a = randomInt(1, 20);
          const b = randomInt(1, 500);
          const places = randomInt(1, 5);
          const uint = 10 ** places;
          const result = Math.floor(((uint * a) + b / 2) / b);
          return [[a, b, places], result];
        });
      }
      contest.assert(testContract.rateOf, 'calculates the correct rate', inputs(5), (res) => res.toNumber());
    });

    describe('rateFrom', function () {
      function inputs(n) {
        return Array.apply(null, { length: n }).map(() => {
          const amount = randomInt(1, 20);
          const baserate = randomInt(1, 500);
          const places = randomInt(1, 5);
          const result = Math.floor((amount * baserate) / (10 ** places));
          return [[amount, baserate, places], result];
        });
      }
      contest.assert(testContract.fromRate, 'calculates the correct rate', inputs(5), (res) => res.toNumber());
    });

    if (!tempo.testRpcApi) {
      log('skipping DigixMath.feeDays');
      log('skipping DigixMath.calculateDemurrage');
    } else {
      describe('feeDays', function () {
        // set the 'now' using tempo...
        it('calculates the correct number of fee days', function () {
          const numberOfDays = randomInt(12, 40);
          let beforeTime;
          return tempo.waitForBlocks(1) // reset the time
          .then(() => {
            beforeTime = tempo.currentTimestamp;
            return testContract.feeDays.call(beforeTime);
          }).then((res) => {
            assert.equal(0, res.toNumber());
            return tempo.waitForBlocks(1, numberOfDays * ONE_DAY_IN_SECONDS);
          })
          .then(() => testContract.feeDays.call(beforeTime))
          .then((res) => assert.equal(numberOfDays, res.toNumber()));
        });
      });

      describe('calculateDemurrage', function () {
        it('calcualtes the demurrage fee correcntly', function (done) {
          const data = Array.apply(null, { length: 3 }).map(() => [randomInt(2, 40), randomInt(1e5, 1e14), randomInt(1, 200)]);
          asyncIterator(data, function ([numberOfDays, balance, dailyfeepermilligram], callback) {
            let beforeTime;
            return tempo.waitForBlocks(1) // reset the time
            .then(() => {
              beforeTime = tempo.currentTimestamp;
              return testContract.calculateDemurrage.call(beforeTime, balance, dailyfeepermilligram);
            }).then(([fee, feedays, newpaymentdate]) => {
              assert.equal(fee.toNumber(), 0);
              assert.equal(feedays.toNumber(), 0);
              assert.equal(newpaymentdate.toNumber(), beforeTime);
              return tempo.waitForBlocks(1, numberOfDays * ONE_DAY_IN_SECONDS);
            })
            .then(() => testContract.calculateDemurrage.call(beforeTime, balance, dailyfeepermilligram))
            .then(([fee, feedays, newpaymentdate]) => {
              const actual = [fee.toNumber(), feedays.toNumber(), newpaymentdate.toNumber()];
              const expected = [
                Math.floor(balance / 1000000) * (dailyfeepermilligram * numberOfDays), // fee
                numberOfDays, // feedays
                beforeTime + (numberOfDays * ONE_DAY_IN_SECONDS), // new payment date
              ];
              log(`inputs: ${JSON.stringify({ numberOfDays, balance, dailyfeepermilligram })}`);
              log(`expected out: ${JSON.stringify(expected)}`);
              log(`actual out: ${JSON.stringify(actual)}`);
              assert.equal(expected[0], actual[0]);
              assert.equal(expected[1], actual[1]);
              assert.equal(expected[2], actual[2]);
              callback();
            });
          }, done);
        });
      });
    }
  });
}
