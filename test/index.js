const SampleContract = artifacts.require('./SampleContract.sol');
const Contest = require('@digix/contest').default;
const { ONE_DAY_IN_SECONDS } = require('@digix/contest/lib/helpers');

contract('SampleContract', function (accounts) {
  new Contest()
  // deploy a version from a secodary account
  .deploy(SampleContract, [{ from: accounts[1] }])
  .call('owner', 'sets the correct owner on deployment (manual sender)', [
    [[], [accounts[1]]],
  ])
  // back to truffle's already deployed version...
  .artifact(SampleContract)
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
  .describe('time sensitive actions')
  .call('daysSinceLastUpdate', 'returns zero days immediately after update', [
    [[0], [0]],
    [[1], [0]],
  ])
  .wait(1, 100)
  .call('daysSinceLastUpdate', `returns zero days for any time less than ${ONE_DAY_IN_SECONDS}`, [
    [[0], [0]],
    [[1], [0]],
  ])
  .wait(1, ONE_DAY_IN_SECONDS * 3)
  .call('daysSinceLastUpdate', 'returns correct number of days after waiting 3 days', [
    [[0], [3]],
    [[1], [3]],
  ])
  .wait(1, ONE_DAY_IN_SECONDS)
  .call('daysSinceLastUpdate', 'returns correct number of days after waiting another day', [
    [[0], [4]],
    [[1], [4]],
  ])
  .describe('Imports')
  .call('safeAdd', 'method with an imported contract is working', [
    [[0, 2], [2]],
    [[40, 2], [42]],
  ])
  .done();
});
