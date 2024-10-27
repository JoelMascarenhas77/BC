import ethCrypto from "eth-crypto";

async function decryptMessage(privateKey, encryptedMessageInput) {
  const encryptedMessage = JSON.parse(encryptedMessageInput); // Parse the encrypted message

  // Decrypt the message
  const decryptedMessage = await ethCrypto.decryptWithPrivateKey(
    privateKey,
    encryptedMessage
  );

  return decryptedMessage; // Return the decrypted message
}
