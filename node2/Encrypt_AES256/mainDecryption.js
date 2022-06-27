// Encryption method: AES-256
// Advanced Encryption Standard (AES) is one of the most frequently used and most secure 
// encryption algorithms available today.

// https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e

// execute: node mainEncryption.js

// if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4){
//     console.log("\nSYNTAX HELP")
//     console.log("\nUsage: node mainDecryption.js filename.ext.enc(!!!) password")
//     console.log("\nThe encrypted file should be placed in ../transfer_resources/asset_encrypted/")
//     console.log("\nThe decrypted file will be placed in ../transfer_resources/asset_ready/\n")
//     return
//   }

function mainDecryption(fileName, password, pathName, destinyPath){
  console.log("Password (file mainDEcryp): " + password)
  const decrypt = require('./decrypt.js');
  
  let b = decrypt.decrypt(fileName, password, pathName, destinyPath);
  console.log("Decryption executed")
}

module.exports={mainDecryption}
