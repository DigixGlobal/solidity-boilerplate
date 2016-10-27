import log from '../../helpers/logger';
import { randomInt } from '../../helpers/random';
import { asyncIterator } from '../../helpers/async';

import { BIG_INT, BIG_INT_MINUS_TWO } from '../../helpers/constants';

export default function () {
  describe('DoublyLinkedList', function () {
    this.timeout(400);

    // redeploy a new test contract for each run, so we can test initial values...
    let testContract;
    before((done) => {
      contracts.TestDoublyLinkedList.new().then((contract) => {
        log('Deployed new TestDLL instance', contract.address);
        testContract = contract;
        done();
      });
    });

    const testConfig = {
      UintData: {
        methods: ['find', 'append', 'remove', 'total', 'start', 'valid', 'previous', 'next', 'get'],
        samples: [1, 2, 42, BIG_INT_MINUS_TWO, BIG_INT],
        transform: 'toNumber',
      },
      AddressData: {
        methods: ['find', 'append', 'remove', 'total', 'start', 'valid', 'previous', 'next', 'get'],
        samples: [
          '0x4366ddc115d8cf213c564da36e64c8ebaa30cdbd',
          '0x00317cd2da2044840b1ebe775c676530a7c65ba3',
          '0x1728039ce0d18a799c081c5c7fa2090dd365a8d0',
          '0xd504141a26a832013b7173077a331ac44f25e682',
          '0x80927335696ac13debdfb8bbf0199070519cf818',
          '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
        ],
      },
      BytesData: {
        methods: ['find', 'append', 'remove', 'total', 'start', 'valid', 'previous', 'next', 'get'],
        samples: [
          '0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df9d1b02',
          '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49343',
          '0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df9d1102',
          '0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df5d1b02',
        ],
      },
      BoolData: {
        methods: ['append', 'remove', 'total', 'start', 'valid', 'previous', 'next', 'get'],
        samples: [true, false],
      },
      StringData: {
        methods: ['append', 'remove', 'total', 'start', 'valid', 'previous', 'next'/* , TODO 'get' */],
        samples: ['digix', 'is', 'the', 'best!', 'TODO some very long string'],
      },
    };

    // create the test suite
    Object.keys(testConfig).forEach((dataType) => {
      describe(dataType, function () {
        const config = testConfig[dataType];

        function randomItem() {
          return config.samples[randomInt(0, config.samples.length - 1)];
        }

        function method(name) {
          return testContract[`${name}${dataType}`];
        }

        function canTest(name) {
          return config.methods.indexOf(name) > -1;
        }

        function checkTotal(total, text) {
          it(text || `maintains the correct total of ${total}`, function () {
            return method('total').call()
            .then(res => assert.equal(res.toNumber(), total))
            .catch(err => assert.ifError(err));
          });
        }

        function parseResult(res) {
          if (!config.transform) { return res; }
          return res[config.transform]();
        }

        // check the length on init is zero
        checkTotal(0, 'initializes with 0');

        const firstInsert = randomItem();


        it('can append an item', function () {
          return method('append')(firstInsert)
          .then(tx => assert.isOk(tx))
          .catch(err => assert.ifError(err));
        });
        it('can append another item', function () {
          return method('append')(firstInsert)
          .then(tx => assert.isOk(tx))
          .catch(err => assert.ifError(err));
        });

        checkTotal(2);

        if (canTest('get')) {
          it('can get an item from its index', function () {
            return method('get').call(1)
            .then(res => assert.equal(parseResult(res), firstInsert))
            .catch(err => assert.ifError(err));
          });
        }

        it('returns true on valid items', function () {
          return method('valid').call(1)
          .then(res => assert.equal(res, true))
          .catch(err => assert.ifError(err));
        });

        it('returns false on invalid items', function () {
          return method('valid').call(0)
          .then((res) => {
            assert.equal(res, false);
            return method('valid').call(3);
          })
          .then(res => assert.equal(res, false))
          .catch(err => assert.ifError(err));
        });

        it('removes an item by index', function () {
          return method('remove')(1)
          .then(tx => assert.isOk(tx))
          .catch(err => assert.ifError(err));
        });

        checkTotal(1);

        it('removes an item by index', function () {
          return method('remove')(1)
          .then(tx => assert.isOk(tx))
          .catch(err => assert.ifError(err));
        });

        checkTotal(0);

        const randomItems = Array(randomInt(5, 30)).fill(undefined).map(randomItem);
        it('inserts a bunch of items', function (done) {
          this.timeout(200 * randomItems.length);
          asyncIterator(randomItems, (item, callback) => {
            method('append')(item).then(callback);
          }, () => {
            return method('total').call()
            .then((res) => {
              assert.equal(res.toNumber(), randomItems.length);
              done();
            }).catch(err => {
              assert.ifError(err);
              done(err);
            });
          });
        });

        if (canTest('get')) {
          let firstIndex;
          let secondIndex;

          it('provides the correct starting index', function () {
            return method('start').call()
            .then((res) => {
              firstIndex = res.toNumber();
              return method('get').call(firstIndex);
            })
            .then(res => assert.equal(parseResult(res), randomItems[0]))
            .catch(err => assert.ifError(err));
          });

          it('gives the correct next index', function () {
            return method('next').call(firstIndex)
            .then((res) => {
              secondIndex = res.toNumber();
              return method('get').call(secondIndex);
            })
            .then(res => assert.equal(parseResult(res), randomItems[1]))
            .catch(err => assert.ifError(err));
          });

          it('gives the correct previous index', function () {
            return method('previous').call(secondIndex)
            .then(res => assert.equal(res.toNumber(), firstIndex))
            .catch(err => assert.ifError(err));
          });
        }
      });
    });
  });
}
