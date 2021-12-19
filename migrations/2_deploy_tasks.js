const MyTasksContract = artifacts.require("MyTasksContract");

module.exports = function (deployer) {
  deployer.deploy(MyTasksContract);
};
