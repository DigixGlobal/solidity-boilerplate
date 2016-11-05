export default function ({ web3, accounts, contracts }) {
  const initialAmount = 1024 + Math.ceil(Math.random() * 1024);
  const diffAmount = 500 + Math.ceil(Math.random() * 200);
  const maxTokens = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  const balances = [{
    // initial amount
    [accounts[0]]: initialAmount,
    [accounts[1]]: 0,
    [accounts[2]]: 0,
  }, {
    // amount after transfers
    [accounts[0]]: 0,
    [accounts[1]]: initialAmount - diffAmount,
    [accounts[2]]: diffAmount,
  }];

  // creation: should succeed in creating over 2^256 - 1 (max) tokens"
  contest
  .deploy(contracts.TestStandardToken, [maxTokens, { from: accounts[0] }])
  .call('balanceOf', 'deploys with max tokens', { [accounts[0]]: maxTokens })
  .done();
  // // creation: should create an initial balance of 10000 for the creator"
  contest
  .deploy(contracts.TestStandardToken, [balances[0][accounts[0]], { from: accounts[0] }])
  .call('balanceOf', 'deploys with supplied balance', balances[0])
  //
  .describe('Transfers and Balances')
  .tx('transfer', 'does not throw when doesnt have any balance', [
    [accounts[1], balances[1][accounts[1]], { from: accounts[1] }],
  ])
  // transfers: ether transfer should be reversed.
  .it('doesnt accept ether transfers', function (instnace) {
    return new Promise((resolve) => {
      web3.eth.sendTransaction({ from: accounts[0], to: instnace.address, value: 1 }, (err) => {
        assert.ok(err);
        resolve();
      });
    });
  })
  // transfers: should fail when trying to transfer zero. (using call)
  .call('transfer', 'call trasnfer returns false when sender doesnt have any balance', [
    [[accounts[1], balances[1][accounts[1]], { from: accounts[1] }], [false]],
  ])
  .call('balanceOf', 'did not make the transfer when sender has no balance', balances[0])
  .tx('transfer', 'does not throw when sender does not have enough balance', [
    [accounts[1], balances[0][accounts[0]] + 1, { from: accounts[0] }],
  ])
  .call('balanceOf', 'did not make the transfer when sender did not have enough balance', balances[0])
  // // hey, it's an event assersion!
  .watch('Transfer', 'fires the events on transfer', [
    { _from: accounts[0], _to: accounts[1], _value: balances[1][accounts[1]] },
    { _from: accounts[0], _to: accounts[2], _value: balances[1][accounts[2]] },
  ])
  .tx('transfer', 'good transfers do not throw', [
    [accounts[1], balances[1][accounts[1]], { from: accounts[0] }],
    [accounts[2], balances[1][accounts[2]], { from: accounts[0] }],
  ])
  .call('balanceOf', 'has the correct balance after transfers', balances[1])
  .tx('transfer', 'does not throw when sender balance is zero', [
    [accounts[1], 1, { from: accounts[0] }],
  ])
  .call('balanceOf', 'did not make the transfer when balance was zero', balances[1])
  .tx('transfer', 'good transfers do not throw from other users sending', [
    [accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
    [accounts[0], balances[1][accounts[2]], { from: accounts[2] }],
  ])
  // new ting
  .describe('Approvals')
  .deploy(contracts.TestStandardToken, [balances[0][accounts[0]], { from: accounts[0] }])
  .call('balanceOf', 'deploys with supplied balance', balances[0])  //
  .call('allowance', 'default allowances are set to zero', [
    [[accounts[0], accounts[1]], [0]],
    [[accounts[0], accounts[2]], [0]],
    [[accounts[1], accounts[0]], [0]],
    [[accounts[1], accounts[2]], [0]],
    [[accounts[2], accounts[0]], [0]],
    [[accounts[2], accounts[1]], [0]],
  ])
  // approvals: msg.sender should approve 100 to accounts[1]
  .watch('Approval', 'fires when user is approved', [
    { _owner: accounts[0], _spender: accounts[1], _value: 100 },
  ])
  .tx('approve', 'allowance transaction succeeds', [
    [accounts[1], 100, { from: accounts[0] }],
  ])
  .call('allowance', 'allowance balance is updated', [
    [[accounts[0], accounts[1]], [100]],
  ])
  // approvals: approve max (2^256 - 1)
  .tx('approve', 'allowance transaction succeeds with maximum allowance', [
    [accounts[1], maxTokens, { from: accounts[2] }],
  ])
  .call('allowance', 'allowance balance is updated with maximium allowance', [
    [[accounts[2], accounts[1]], [maxTokens]],
  ])
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.
  .tx('transferFrom', 'withdraw transaction succeeds', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  .call('allowance', 'allowance balances are correct after withdraw', [
    [[accounts[0], accounts[1]], [80]],
  ])
  .call('balanceOf', 'actual balances are correct after withdraw', {
    [accounts[0]]: initialAmount - 20,
    [accounts[1]]: 20,
  })
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.
  .tx('transferFrom', '2nd withdraw transaction succeeds', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  .call('allowance', 'allowance balances are correct after 2nd withdraw', [
    [[accounts[0], accounts[1]], [60]],
  ])
  .call('balanceOf', 'actual balances are correct after 2nd withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)
  .tx('transferFrom', '3rd (failed) withdraw does not throw', [
    [accounts[0], accounts[1], 100, { from: accounts[1] }],
  ])
  .call('allowance', 'allowance balances are correct after 3rd (failed) withdraw', [
    [[accounts[0], accounts[1]], [60]],
  ])
  .call('balanceOf', 'actual balances are correct after 3rd (failed) withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  // approvals: attempt withdrawal from acconut with no allowance (should fail)
  .call('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[accounts[0], accounts[2], 5, { from: accounts[2] }], [false]],
  ])
  .call('transferFrom', 'attempt to transact withdraw from zero allowance doesnt throw', [
    [accounts[0], accounts[2], 5, { from: accounts[2] }],
  ])
  .call('balanceOf', 'actual balance after failed withdraw attempt is zero', {
    [accounts[2]]: 0,
  })
  // 4th witdhrawl should fail (zero allowance after having one)
  .watch('Approval', 'fires when user is approved', [
    { _owner: accounts[0], _spender: accounts[1], _value: 0 },
  ])
  .tx('approve', 'allowance transaction succeeds', [
    [accounts[1], 0, { from: accounts[0] }],
  ])
  .call('allowance', 'allowance balances are correct after setting balance', [
    [[accounts[0], accounts[1]], [0]],
  ])
  .call('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[accounts[0], accounts[1], 20, { from: accounts[1] }], [false]],
  ])
  .tx('transferFrom', '3rd (failed) withdraw does not throw', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  .call('balanceOf', 'actual balances are correct after 4th (failed) withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  .done();
}
