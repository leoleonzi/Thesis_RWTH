function mergerFiles(filename){

  const splitFile = require('split-file');
  const fs = require('fs');

  let files = []
  fs.readdirSync("./transfer_resources/asset_encrypted_splitted_renamed/").forEach(file => {
    files.push("./transfer_resources/asset_encrypted_splitted_renamed/" + file);
  });
  splitFile.mergeFiles(files, './transfer_resources/asset_encrypted/' + filename)
    .then(() => {
      console.log('\nThe merged file was placed in ./transfer_resources/asset_encrypted/\n');
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

module.exports = { mergerFiles }
