const { ethers } = require("ethers");
const Web3 = require("web3");

// Connect to Ganache (default URL is usually http://127.0.0.1:7545)
// Note: You are using web3.js in this example, but it's not needed for the task at hand.
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// List of private keys
const privateKeys = [
  "0xfd3977ecb6a4fe696fbcb52adc7e59e485f81b860103cd965ac1f92379118a96",
  "0xa650901dcdb8ec85a86d9cb086ea5b9fa7943ad919fa341153edff71c738c414",
  "0x7325c3f6897ebb8ff3440f73466113707aae7c4fcc9fce2fe6cdcc6b544da24f",
  "0x4ed2a6b5f3caa88cc2834ba7f170defcfbf1b0b87bbd33d9207233c9e30e8851",
];

// Iterate through the private keys
for (let privateKey of privateKeys) {
  // Create a wallet from the private key
  let wallet = new ethers.Wallet(privateKey);

  // Retrieve the public key
  let publicKey = wallet.publicKey; // Get the public key
  // Get the corresponding address

  // Log the public key and address
  console.log(publicKey);
}
