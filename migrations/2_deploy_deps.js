/* eslint-disable no-undef */

module.exports = (deployer) => {
  deployer.deploy([
    DigixMath,
    DoublyLinkedList,
  ]);
  deployer.deploy([
    ACGroups,
    ACConditions,
    ACDates,
    ACOwned,
    ACSimpleMutex,
    ACState,
    ACUserMutex,
  ]);
  deployer.deploy(ContractResolver);
};
