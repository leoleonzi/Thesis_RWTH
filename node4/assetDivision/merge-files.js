function mergerFiles(filename){

  const splitFile = require('split-file');
  const fs = require('fs');

  // if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 3) {
  //   console.log("\nSYNTAX HELP")
  //   console.log("\nUsage: node merge-files.js newFilename.ext.enc(!!!)")
  //   console.log("\nThe splitted files should be placed in ./../transfer_resources/asset_encrypted_splitted\n")
  //   console.log("The merged file will be placed in ./../transfer_resources/asset_encrypted\n")
  //   return
  // }

  let files = []
  fs.readdirSync("./../transfer_resources/asset_encrypted_splitted").forEach(file => {
    files.push("./../transfer_resources/asset_encrypted_splitted/" + file);
  });

  console.log(files)

  splitFile.mergeFiles(files, './../transfer_resources/asset_encrypted/' + filename)
    .then(() => {
      console.log('\nThe merged file were placed in ./../transfer_resources/asset_encrypted/\n');
    })
    .catch((err) => {
      console.log('Error: ', err);
    });

}

module.exports = { mergerFiles }
