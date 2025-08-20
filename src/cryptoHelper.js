import CryptoJS from "crypto-js";

const secretKey = "CO74CDCABBBJI935136HH7B63C27";
const secretIv  = "5AJf5CO5g84";

// Step 1: SHA256(secretKey) → 64 hex chars, PHP uses as ASCII and OpenSSL truncates to 32 bytes
const keyHex = CryptoJS.SHA256(secretKey).toString();
const key = CryptoJS.enc.Utf8.parse(keyHex.substring(0, 32));

// Step 2: IV = first 16 chars of SHA256(secretIv), as ASCII
const ivHex = CryptoJS.SHA256(secretIv).toString().substring(0, 16);
const iv = CryptoJS.enc.Utf8.parse(ivHex);

// --- Encrypt to match PHP final output (double base64) ---
export function encryptPhpCompatible(plainText) {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  // inner ciphertext as base64
  const innerB64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

  // mimic PHP's second base64_encode
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(innerB64));
}

// --- Decrypt PHP output (double base64) ---
export function decryptPhpCompatible(phpCipher) {
  // Step 1: base64 decode once → get inner base64 string
  const innerB64 = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(phpCipher));

  // Step 2: normal AES decrypt using inner base64
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(innerB64) },
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}
