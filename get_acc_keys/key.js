const { ethers } = require("ethers");
const Web3 = require("web3");

// Connect to Ganache (default URL is usually http://127.0.0.1:7545)
// Note: You are using web3.js in this example, but it's not needed for the task at hand.
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// List of private keys
const privateKeys = [
  "0xb3963cc94941a71fd08cb46aa6243e7661f1462e21d1feb3bd54d52ba93f0257",
  "0x0a064f834037052988c0b9ed738ee170ebf1af6f0df5e0412b188017c32f41cd",
  "0x2ae8f32d3d7c0aa86afec0febe3c71d476ccc74de66af646d6f4ef370b970bdb",
  "0x5f87224fa431f6d259c79b2a641a7d484ab1d00c80a8f91e52a96b4886069241",
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
