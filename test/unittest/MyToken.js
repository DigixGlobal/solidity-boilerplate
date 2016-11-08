export default function ({ users, contracts }) {
  const startingAmount = Math.ceil(Math.random() * 1024);
  const name = 'Testing';
  const decimals = 13;
  const symbol = 'TEST';

  contest
  .deploy(contracts.MyToken, [startingAmount, name, decimals, symbol, { from: users.deployer }])
  .call('has the correct initializaton values', {
    name, decimals, symbol,
  })
  .call('balanceOf', 'initializes with the correct balances', {
    [users.deployer]: startingAmount,
    [users.user1]: 0,
  })
  .done();
}
