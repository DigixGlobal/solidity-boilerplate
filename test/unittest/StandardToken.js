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
  ._('balanceOf', 'deploys with max tokens', { [accounts[0]]: maxTokens })
  // // creation: should create an initial balance of 10000 for the creator"
  .deploy(contracts.TestStandardToken, [balances[0][accounts[0]], { from: accounts[0] }])
  ._('balanceOf', 'deploys with supplied balance', balances[0])
  //
  .describe('Transfers and Balances')
  ._('transfer transaction', 'does not throw when doesnt have any balance', [
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
  ._('transfer', 'call trasnfer returns false when sender doesnt have any balance', [
    [[accounts[1], balances[1][accounts[1]], { from: accounts[1] }], [false]],
  ])
  ._('balanceOf', 'did not make the transfer when sender has no balance', balances[0])
  ._('transfer transaction', 'does not throw when sender does not have enough balance', [
    [accounts[1], balances[0][accounts[0]] + 1, { from: accounts[0] }],
  ])
  ._('balanceOf', 'did not make the transfer when sender did not have enough balance', balances[0])
  // // hey, it's an event assersion!
  ._('Transfer event', 'fires the events on transfer', [
    { _from: accounts[0], _to: accounts[1], _value: balances[1][accounts[1]] },
    { _from: accounts[0], _to: accounts[2], _value: balances[1][accounts[2]] },
  ])
  ._('transfer transaction', 'good transfers do not throw', [
    [accounts[1], balances[1][accounts[1]], { from: accounts[0] }],
    [accounts[2], balances[1][accounts[2]], { from: accounts[0] }],
  ])
  ._('balanceOf', 'has the correct balance after transfers', balances[1])
  ._('transfer transaction', 'does not throw when sender balance is zero', [
    [accounts[1], 1, { from: accounts[0] }],
  ])
  ._('balanceOf', 'did not make the transfer when balance was zero', balances[1])
  ._('transfer transaction', 'good transfers do not throw from other users sending', [
    [accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
    [accounts[0], balances[1][accounts[2]], { from: accounts[2] }],
  ])
  ._('balanceOf', 'other users can send back their value', balances[0])
  //
  .describe('Approvals')
  ._('allowance', 'default allowances are set to zero', [
    [[accounts[0], accounts[1]], [0]],
    [[accounts[0], accounts[2]], [0]],
    [[accounts[1], accounts[0]], [0]],
    [[accounts[1], accounts[2]], [0]],
    [[accounts[2], accounts[0]], [0]],
    [[accounts[2], accounts[1]], [0]],
  ])
  // approvals: msg.sender should approve 100 to accounts[1]
  ._('Approval event', 'fires when user is approved', [
    { _owner: accounts[0], _spender: accounts[1], _value: 100 },
  ])
  ._('approve transaction', 'allowance transaction succeeds', [
    [accounts[1], 100, { from: accounts[0] }],
  ])
  ._('allowance', 'allowance balance is updated', [
    [[accounts[0], accounts[1]], [100]],
  ])
  // approvals: approve max (2^256 - 1)
  ._('approve transaction', 'allowance transaction succeeds with maximum allowance', [
    [accounts[1], maxTokens, { from: accounts[2] }],
  ])
  ._('allowance', 'allowance balance is updated with maximium allowance', [
    [[accounts[2], accounts[1]], [maxTokens]],
  ])
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.
  ._('transferFrom transaction', 'withdraw transaction succeeds', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  ._('allowance', 'allowance balances are correct after withdraw', [
    [[accounts[0], accounts[1]], [80]],
  ])
  ._('balanceOf', 'actual balances are correct after withdraw', {
    [accounts[0]]: initialAmount - 20,
    [accounts[1]]: 20,
  })
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.
  ._('transferFrom transaction', '2nd withdraw transaction succeeds', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  ._('allowance', 'allowance balances are correct after 2nd withdraw', [
    [[accounts[0], accounts[1]], [60]],
  ])
  ._('balanceOf', 'actual balances are correct after 2nd withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  // approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)
  ._('transferFrom transaction', '3rd (failed) withdraw does not throw', [
    [accounts[0], accounts[1], 100, { from: accounts[1] }],
  ])
  ._('allowance', 'allowance balances are correct after 3rd (failed) withdraw', [
    [[accounts[0], accounts[1]], [60]],
  ])
  ._('balanceOf', 'actual balances are correct after 3rd (failed) withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  // approvals: attempt withdrawal from acconut with no allowance (should fail)
  ._('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[accounts[0], accounts[2], 5, { from: accounts[2] }], [false]],
  ])
  ._('transferFrom', 'attempt to transact withdraw from zero allowance doesnt throw', [
    [accounts[0], accounts[2], 5, { from: accounts[2] }],
  ])
  ._('balanceOf', 'actual balance after failed withdraw attempt is zero', {
    [accounts[2]]: 0,
  })
  // 4th witdhrawl should fail (zero allowance after having one)
  ._('Approval event', 'fires when user is approved', [
    { _owner: accounts[0], _spender: accounts[1], _value: 0 },
  ])
  ._('approve transaction', 'allowance transaction succeeds', [
    [accounts[1], 0, { from: accounts[0] }],
  ])
  ._('allowance', 'allowance balances are correct after setting balance', [
    [[accounts[0], accounts[1]], [0]],
  ])
  ._('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[accounts[0], accounts[1], 20, { from: accounts[1] }], [false]],
  ])
  ._('transferFrom transaction', '3rd (failed) withdraw does not throw', [
    [accounts[0], accounts[1], 20, { from: accounts[1] }],
  ])
  ._('balanceOf', 'actual balances are correct after 4th (failed) withdraw', {
    [accounts[0]]: initialAmount - 40,
    [accounts[1]]: 40,
  })
  .done();
}
