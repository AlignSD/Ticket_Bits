var EventFactory = artifacts.require("EventFactory");
var Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(EventFactory);
  deployer.deploy(Marketplace);
};