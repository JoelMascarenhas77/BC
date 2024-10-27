const Web3 = require("web3");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Ganache port (default: 7545 for Ganache UI)
      network_id: "*", // Any network (default: none)
    },
  },

  mocha: {},

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
