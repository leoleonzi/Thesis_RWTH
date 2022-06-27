// Encryption method: AES-256
// Advanced Encryption Standard (AES) is one of the most frequently used and most secure 
// encryption algorithms available today.

// https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e

// execute: node mainEncryption.js


// if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4){
//     // console.log(Date.now())
//     console.log("\nSYNTAX HELP")
//     console.log("\nUsage: node mainEcryption.js filename.ext password")
//     console.log("\nThe file should be placed in ../transfer_resources/asset_ready/\n")
//     console.log("The encrypted file will be placed in ../transfer_resources/asset_encrypted/\n")
//     return
//   }

async function mainEncryption(filepath, filename, password, destinationPath){
  const encrypt = require('./encrypt.js');
  
  let a = await encrypt.encrypt(filepath, filename, password, destinationPath);
}

module.exports={mainEncryption}



