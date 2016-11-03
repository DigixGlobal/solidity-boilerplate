export default function ({ accounts, contracts }) {
  const initialAmount = 1024 + Math.ceil(Math.random() * 1024);
  const diffAmount = 500 + Math.ceil(Math.random() * 200);

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

  contest.
  deploy(contracts.TestStandardToken, [balances[0][accounts[0]], { from: accounts[0] }])

  .describe('Initialization values')
  ._('balanceOf', 'has correct initialization balance', balances[0])

  .describe('Transfers')
  ._('transfer transaction', 'does not throw when sender is not owner', [
    [accounts[1], balances[1][accounts[1]], { from: accounts[1] }],
  ])
  ._('balanceOf', 'did not make the transfer when sender was not owner', balances[0])
  ._('transfer transaction', 'does not throw when sender does not have enough balance', [
    [accounts[1], balances[0][accounts[0]] + 1, { from: accounts[0] }],
  ])
  ._('balanceOf', 'did not make the transfer when sender did not have enough balance', balances[0])
  ._('Transfer event', 'fires the events on transfer', [
    { _from: accounts[0], _to: accounts[1], _value: balances[1][accounts[1]] },
    { _from: accounts[0], _to: accounts[2], _value: balances[1][accounts[2]] },
  ])
  ._('transfer transaction', 'good transfers do not throw', [
    [accounts[1], balances[1][accounts[1]], { from: accounts[0] }],
    [accounts[2], balances[1][accounts[2]], { from: accounts[0] }],
  ])
  ._('balanceOf', 'has the correct balance', balances[1])
  ._('transfer transaction', 'does not throw when sender balance is zero', [
    [accounts[1], 1, { from: accounts[0] }],
  ])
  ._('balanceOf', 'did not make the transfer when balance was zero', balances[1])
  ._('transfer transaction', 'good transfers do not throw from other users sending', [
    [accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
    [accounts[0], balances[1][accounts[2]], { from: accounts[2] }],
  ])
  ._('balanceOf', 'other users can send back their value', balances[0])

  .describe('')

  .done();

  // now we deal with transferFrom
  // POSSIBLE API?
  // contest(contract).deploy()
  // .become(accounts[1])
  // .test('call transfer suceeds with good values', [
  //   [owner, 200, { from: spender }],
  //   [owner, 200, { from: spender }],
  // ])
  // .test('')
  // .test({
  //   "assert balanceOf": accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
  //   "transact balanceOf": accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
  //   "trow balanceOf": accounts[0], balances[1][accounts[1]], { from: accounts[1] }],
  // })

  // transferFrom
  // balanceOf
  // approve
  // allowance
}
