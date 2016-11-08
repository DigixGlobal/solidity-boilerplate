export default function ({ users, web3, contracts }) {
  const initialAmount = 1024 + Math.ceil(Math.random() * 1024);
  const diffAmount = 500 + Math.ceil(Math.random() * 200);
  const maxTokens = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  const balances = [{
    // initial amount
    [users.deployer]: initialAmount,
    [users.user1]: 0,
    [users.user2]: 0,
  }, {
    // amount after transfers
    [users.deployer]: 0,
    [users.user1]: initialAmount - diffAmount,
    [users.user2]: diffAmount,
  }];

  // creation: should succeed in creating over 2^256 - 1 (max) tokens"
  contest
  .deploy(contracts.TestStandardToken, [maxTokens, { from: users.deployer }])
  .call('balanceOf', 'deploys with max tokens', { [users.deployer]: maxTokens })
  .done();
  // // creation: should create an initial balance of 10000 for the creator"
  contest
  .deploy(contracts.TestStandardToken, [balances[0][users.deployer], { from: users.deployer }])
  .call('balanceOf', 'deploys with supplied balance', balances[0])
  //
  .describe('Transfers and Balances')
  .tx('transfer', 'does not throw when doesnt have any balance', [
    [users.user1, balances[1][users.user1], { from: users.user1 }],
  ])
  // transfers: ether transfer should be reversed.
  .it('doesnt accept ether transfers', function (instnace) {
    return new Promise((resolve) => {
      web3.eth.sendTransaction({ from: users.deployer, to: instnace.address, value: 1 }, (err) => {
        assert.ok(err);
        resolve();
      });
    });
  })
  // transfers: should fail when trying to transfer zero. (using call)
  .call('transfer', 'call trasnfer returns false when sender doesnt have any balance', [
    [[users.user1, balances[1][users.user1], { from: users.user1 }], [false]],
  ])
  .call('balanceOf', 'did not make the transfer when sender has no balance', balances[0])
  .tx('transfer', 'does not throw when sender does not have enough balance', [
    [users.user1, balances[0][users.deployer] + 1, { from: users.deployer }],
  ])
  .call('balanceOf', 'did not make the transfer when sender did not have enough balance', balances[0])
  // // hey, it's an event assersion!
  .watch('Transfer', 'fires the events on transfer', [
    { _from: users.deployer, _to: users.user1, _value: balances[1][users.user1] },
    { _from: users.deployer, _to: users.user2, _value: balances[1][users.user2] },
  ])
  .tx('transfer', 'good transfers do not throw', [
    [users.user1, balances[1][users.user1], { from: users.deployer }],
    [users.user2, balances[1][users.user2], { from: users.deployer }],
  ])
  .call('balanceOf', 'has the correct balance after transfers', balances[1])
  .tx('transfer', 'does not throw when sender balance is zero', [
    [users.user1, 1, { from: users.deployer }],
  ])
  .call('balanceOf', 'did not make the transfer when balance was zero', balances[1])
  .tx('transfer', 'good transfers do not throw from other users sending', [
    [users.deployer, balances[1][users.user1], { from: users.user1 }],
    [users.deployer, balances[1][users.user2], { from: users.user2 }],
  ])
  // new ting
  .describe('Approvals')
  .deploy(contracts.TestStandardToken, [balances[0][users.deployer], { from: users.deployer }])
  .call('balanceOf', 'deploys with supplied balance', balances[0])  //
  .call('allowance', 'default allowances are set to zero', [
    [[users.deployer, users.user1], [0]],
    [[users.deployer, users.user2], [0]],
    [[users.user1, users.deployer], [0]],
    [[users.user1, users.user2], [0]],
    [[users.user2, users.deployer], [0]],
    [[users.user2, users.user1], [0]],
  ])
  // approvals: msg.sender should approve 100 to users.user1
  .watch('Approval', 'fires when user is approved', [
    { _owner: users.deployer, _spender: users.user1, _value: 100 },
  ])
  .tx('approve', 'allowance transaction succeeds', [
    [users.user1, 100, { from: users.deployer }],
  ])
  .call('allowance', 'allowance balance is updated', [
    [[users.deployer, users.user1], [100]],
  ])
  // approvals: approve max (2^256 - 1)
  .tx('approve', 'allowance transaction succeeds with maximum allowance', [
    [users.user1, maxTokens, { from: users.user2 }],
  ])
  .call('allowance', 'allowance balance is updated with maximium allowance', [
    [[users.user2, users.user1], [maxTokens]],
  ])
  // approvals: msg.sender approves users.user1 of 100 & withdraws 20 once.
  .tx('transferFrom', 'withdraw transaction succeeds', [
    [users.deployer, users.user1, 20, { from: users.user1 }],
  ])
  .call('allowance', 'allowance balances are correct after withdraw', [
    [[users.deployer, users.user1], [80]],
  ])
  .call('balanceOf', 'actual balances are correct after withdraw', {
    [users.deployer]: initialAmount - 20,
    [users.user1]: 20,
  })
  // approvals: msg.sender approves users.user1 of 100 & withdraws 20 twice.
  .tx('transferFrom', '2nd withdraw transaction succeeds', [
    [users.deployer, users.user1, 20, { from: users.user1 }],
  ])
  .call('allowance', 'allowance balances are correct after 2nd withdraw', [
    [[users.deployer, users.user1], [60]],
  ])
  .call('balanceOf', 'actual balances are correct after 2nd withdraw', {
    [users.deployer]: initialAmount - 40,
    [users.user1]: 40,
  })
  // approvals: msg.sender approves users.user1 of 100 & withdraws 50 & 60 (2nd tx should fail)
  .tx('transferFrom', '3rd (failed) withdraw does not throw', [
    [users.deployer, users.user1, 100, { from: users.user1 }],
  ])
  .call('allowance', 'allowance balances are correct after 3rd (failed) withdraw', [
    [[users.deployer, users.user1], [60]],
  ])
  .call('balanceOf', 'actual balances are correct after 3rd (failed) withdraw', {
    [users.deployer]: initialAmount - 40,
    [users.user1]: 40,
  })
  // approvals: attempt withdrawal from acconut with no allowance (should fail)
  .call('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[users.deployer, users.user2, 5, { from: users.user2 }], [false]],
  ])
  .call('transferFrom', 'attempt to transact withdraw from zero allowance doesnt throw', [
    [users.deployer, users.user2, 5, { from: users.user2 }],
  ])
  .call('balanceOf', 'actual balance after failed withdraw attempt is zero', {
    [users.user2]: 0,
  })
  // 4th witdhrawl should fail (zero allowance after having one)
  .watch('Approval', 'fires when user is approved', [
    { _owner: users.deployer, _spender: users.user1, _value: 0 },
  ])
  .tx('approve', 'allowance transaction succeeds', [
    [users.user1, 0, { from: users.deployer }],
  ])
  .call('allowance', 'allowance balances are correct after setting balance', [
    [[users.deployer, users.user1], [0]],
  ])
  .call('transferFrom', 'attempt to call withdraw from zero allowance fails', [
    [[users.deployer, users.user1, 20, { from: users.user1 }], [false]],
  ])
  .tx('transferFrom', '3rd (failed) withdraw does not throw', [
    [users.deployer, users.user1, 20, { from: users.user1 }],
  ])
  .call('balanceOf', 'actual balances are correct after 4th (failed) withdraw', {
    [users.deployer]: initialAmount - 40,
    [users.user1]: 40,
  })
  .done();
}
