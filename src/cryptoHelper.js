import CryptoJS from "crypto-js";

const secretKey = "CO74CDCABBBJI935136HH7B63C27"; // same as PHP
const secretIv = "5AJf5CO5g84"; // same as PHP

// Generate key & iv (same way as PHP)
const key = CryptoJS.SHA256(secretKey);
const iv = CryptoJS.enc.Utf8.parse(
  CryptoJS.SHA256(secretIv).toString().substring(0, 16)
);

export function encrypt(string) {
  const encrypted = CryptoJS.AES.encrypt(string, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decrypt(base64String) {
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(base64String) },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}
