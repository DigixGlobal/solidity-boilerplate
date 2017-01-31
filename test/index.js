/* globals SampleContract */
import Contest from '@digix/contest';
const contest = new Contest({ debug: true });

contract('SampleContract', function (accounts) {
  // needs to be be inside an `it` block for truffle to be ready
  it('', function () {
    contest
    // deploy a version from a secodary account
    .deploy(SampleContract, [{ from: accounts[1] }])
    .call('owner', 'sets the correct owner on deployment (manual sender)', [
      [[], [accounts[1]]],
    ])
    // back to truffle's already deployed version (using `npm run deploy`)...
    .use(SampleContract.deployed())
    .call('owner', 'sets the correct owner on deployment from coinbase', [
      [[], [accounts[0]]],
    ])
    .describe('add data')
    // send a couple of transactions from owner
    .tx('addData', 'valid transactions do not throw', [
      ['0x1111111111111111111111111111111111111111', 10, false], // dataId 0
      ['0x2222222222222222222222222222222222222222', 20, true], // dataId 1
    ])
    // send a couple of transactions from owner
    .tx('addData', 'throws when sending from non-owner', [
      ['0x1111111111111111111111111111111111111111', 10, false, { from: accounts[1] }], // should throw!
    ])
    // assert the values are correct
    .call('getData', 'correct values are set after addData', [
      [[0], ['0x1111111111111111111111111111111111111111', 10, false]],
      [[1], ['0x2222222222222222222222222222222222222222', 20, true]],
    ])
    // same suite for update age...
    .describe('update age')
    .tx('updateAge', 'valid transactions do not throw', [
      [0, 11],
      [1, 21],
    ])
    .tx('updateAge', 'throws when sending from non-owner', [
      [0, 12, { from: accounts[1] }],
    ])
    .call('getData', 'correct values are set after updateAge', [
      [[0], ['0x1111111111111111111111111111111111111111', 11, false]],
      [[1], ['0x2222222222222222222222222222222222222222', 21, true]],
    ])
    .done();
  });
});
