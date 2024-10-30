const Record = artifacts.require("Record"); // Ensure 'records' is all lowercase

module.exports = function (deployer) {
  deployer.deploy(Record);
};
