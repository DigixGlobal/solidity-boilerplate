/* eslint-disable no-undef */

module.exports = (deployer) => {
  if (deployer.network !== 'live') {
    // deploy those lovely tests

    // deploy
    deployer.deploy([
      TestDoublyLinkedList,
//      TestACDates,
      // TestACOwned, // deployed in tests
      // TestACGroups, // deployed in tests
    ]);
  }
};
