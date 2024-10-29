const Web3 = require("web3");

// Connect to Ganache (default URL is usually http://127.0.0.1:7545)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Function to get account addresses
const getAccountAddresses = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Account Addresses:", accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
  }
};

// Run the function
getAccountAddresses();
