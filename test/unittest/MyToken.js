export default function ({ accounts, contracts }) {
  const startingAmount = Math.ceil(Math.random() * 1024);
  const name = 'Testing';
  const decimals = 13;
  const symbol = 'TEST';

  contest
  .deploy(contracts.MyToken, [startingAmount, name, decimals, symbol, { from: accounts[0] }])
  ._('has the correct initializaton values', {
    name, decimals, symbol,
  })
  ._('balanceOf', 'initializes with the correct balances', {
    [accounts[0]]: startingAmount,
    [accounts[1]]: 0,
  })
  .done();
}
