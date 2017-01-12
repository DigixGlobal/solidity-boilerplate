module.exports = (deployer) => {
  // add DigixMath to known contracts;
  deployer.deploy(DigixMath);
  deployer.deploy(DigixMathTester);
};
