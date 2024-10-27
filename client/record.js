const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const EthCrypto = require("eth-crypto");

const { account_keys } = require("./public/js/info.js");

router.get("/addrecords", (req, res) => {
  res.render("addRecords", { account_keys });
});

router.get("/findrecords", (req, res) => {
  res.render("findRecords");
});

router.post("/deci", async (req, res) => {
  const { privateKey, patientRecord, iv, encKey } = req.body;
  console.log("Request body:", req.body);

  try {
    // Decrypt the symmetric key using the private key
    const decryptedSymmetricKey = await EthCrypto.decryptWithPrivateKey(
      privateKey,
      EthCrypto.cipher.parse(encKey)
    );
    console.log("Request body:");

    // Convert the decrypted key back to Buffer
    const symKeyBuffer = Buffer.from(decryptedSymmetricKey, "base64");
    const ivBuffer = Buffer.from(iv, "hex"); // Assuming iv is sent as a hex string

    // Step 6: Decrypt the Message Using the Decrypted Symmetric Key
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      symKeyBuffer,
      ivBuffer
    );
    let decryptedMessage = decipher.update(patientRecord, "hex", "utf8");
    decryptedMessage += decipher.final("utf8");

    // Send the decrypted message back to the client
    res.json({
      success: true,
      decryptedMessage: decryptedMessage,
    });
  } catch (error) {
    console.error("Decryption error:", error);
    res.status(500).json({
      success: false,
      error: "Decryption failed. Please check the provided keys and data.",
    });
  }
});

module.exports = router;
