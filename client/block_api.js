const express = require("express");
const Web3 = require("web3");
const crypto = require("crypto");
const EthCrypto = require("eth-crypto");
const router = express.Router();
const { account_keys } = require("./public/js/info.js");

const web3 = new Web3("http://127.0.0.1:7545");

// Load contract ABI and address
const contractABI = require("../build/contracts/Record.json").abi;
const contractAddress = "0x6D17f002221fb85998AeDa1da50BCe04DCeb4125";
const recordContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to encrypt data using a public key
async function encryptWithPublicKey(publicKey, message) {
  const encrypted = await EthCrypto.encryptWithPublicKey(publicKey, message);
  return EthCrypto.cipher.stringify(encrypted); // Convert to a string format
}

router.post("/add-patient", async (req, res) => {
  const account = req.cookies.address.trim();

  const { ID, name, record, doctors } = req.body;

  const key = Buffer.from(
    "8466fb05cb14cec833588741ff7b40136247c53ae3bf4ca26cf4ebaffbf68916",
    "hex"
  );
  const iv = Buffer.from("3419933c9fbd4a3842728a9906b946b0", "hex");

  // Encrypt the patient's record using AES
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let enc_record = cipher.update(record, "utf8", "hex");
  enc_record += cipher.final("hex");

  let enc_keys = [];

  // Encrypt the symmetric key for each doctor
  for (const doctor of doctors) {
    let p_key = account_keys[doctor];

    let enc_key = await encryptWithPublicKey(p_key, key.toString("base64"));
    enc_keys.push(enc_key);
  }

  try {
    // Estimate gas before sending the transaction
    const estimatedGas = await recordContract.methods
      .addPatient(ID, name, enc_record, iv.toString("hex"), doctors, enc_keys)
      .estimateGas({ from: account });

    console.log("Estimated Gas:", estimatedGas); // Log the estimated gas

    // Send the transaction with the estimated gas limit
    const receipt = await recordContract.methods
      .addPatient(ID, name, enc_record, iv.toString("hex"), doctors, enc_keys)
      .send({ from: account, gas: estimatedGas + 10000 });

    console.log("Transaction Receipt:", receipt); // Log the transaction receipt
    res.json({ success: true, receipt });
  } catch (error) {
    console.error("Error adding patient:", error);
    if (error.message.includes("out of gas")) {
      res
        .status(500)
        .json({ success: false, error: "Transaction ran out of gas." });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

router.get("/get-patient/:id", async (req, res) => {
  const patientId = req.params.id;

  try {
    // Call the smart contract to get patient data
    const patient = await recordContract.methods
      .getPatient(patientId)
      .call({ gas: 3000000 });
    const name = patient[0];
    const enc_record = patient[1];
    const init_v = patient[2];
    const doctors = patient[3];
    const enc_keys = patient[4];
    console.log("aasdasd");
    res.json({
      success: true,
      patient: { name, enc_record, init_v, doctors, enc_keys },
    });
  } catch (error) {
    console.error("Error retrieving patient:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
