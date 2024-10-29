const crypto = require("crypto");
const EthCrypto = require("eth-crypto");

async function encryptAndDecrypt() {
  // Step 1: Generate a Symmetric Key and IV
  const symmetricKey = Buffer.from(
    "8466fb05cb14cec833588741ff7b40136247c53ae3bf4ca26cf4ebaffbf68916",
    "hex"
  );
  const iv = Buffer.from("3419933c9fbd4a3842728a9906b946b0", "hex");

  // Step 2: Encrypt the Message Using the Symmetric Key
  const message = "Air on the G strings";
  const cipher = crypto.createCipheriv("aes-256-cbc", symmetricKey, iv);
  let encryptedMessage = cipher.update(message, "utf8", "hex");
  encryptedMessage += cipher.final("hex");
  const iv_hex = iv.toString("hex");
  const publicKey =
    "04cd1be5dbda198369658130936191ff4b12f619cc82cf2bf0321019689d775cb6705b5513b5bfe287ab4b1dc0657d4357ab70ac5b4d324321c52dc718dfeab6cc"; // Replace with the actual public key
  const encryptedSymmetricKey = await EthCrypto.encryptWithPublicKey(
    publicKey,
    symmetricKey.toString("base64")
  );
  // Convert to a string for storage or transmission
  const encryptedSymmetricKeyString = EthCrypto.cipher.stringify(
    encryptedSymmetricKey
  );

  // Store or send `encryptedMessage` and `encryptedSymmetricKeyString`
  console.log("Encrypted Message:", encryptedMessage);
  console.log("Encrypted Symmetric Key:", encryptedSymmetricKeyString);
  console.log(typeof iv_hex);
  // Decryption process

  // Assume you have the private key for decryption
  const privateKey =
    "0xb3963cc94941a71fd08cb46aa6243e7661f1462e21d1feb3bd54d52ba93f0257"; // Replace with the actual private key

  // Step 5: Decrypt the Symmetric Key Using the Private Key
  const decryptedSymmetricKey = await EthCrypto.decryptWithPrivateKey(
    privateKey,
    EthCrypto.cipher.parse(encryptedSymmetricKeyString)
  );

  // Convert the decrypted key back to Buffer
  const symKeyBuffer = Buffer.from(decryptedSymmetricKey, "base64");
  const iv_byte = Buffer.from(iv_hex, "hex");
  // Step 6: Decrypt the Message Using the Decrypted Symmetric Key
  const decipher = crypto.createDecipheriv("aes-256-cbc", symKeyBuffer, iv);
  let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
  decryptedMessage += decipher.final("utf8");

  console.log("Decrypted Message:", decryptedMessage);
}

// Call the async function
encryptAndDecrypt().catch(console.error);

// const enc_key_for_doctor = enc_keys[doctorIndex];
// const privateKey = account_keys[doctor].privateKey; // Fetch private key for doctor
// const sym_key = await decryptWithPrivateKey(privateKey, enc_key_for_doctor); // Decrypt symmetric key
// const iv = Buffer.from(enc_iv, "hex");

// // // Decrypt the patient record using the symmetric key
// // const decipher = crypto.createDecipheriv(
// //   "aes-256-cbc",
// //   Buffer.from(sym_key, "base64"),
// //   iv
// // );
// // let dec_record = decipher.update(enc_record, "hex", "utf8");
// // dec_record += decipher.final("utf8");

// // Find the encrypted key for this doctor
// const doctorIndex = patient.doctors.indexOf(doctor);
// if (doctorIndex === -1) {
//   return res
//     .status(403)
//     .json({ success: false, error: "Access denied to this record." });
// }
