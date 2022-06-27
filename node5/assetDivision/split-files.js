async function splitFiles(filename, nodesNumber) {

  const splitFile = require('split-file');
  const fs = require('fs');

  // if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4){
  //   console.log("\nSYNTAX HELP")
  //   console.log("\nUsage: node split-files.js filename.ext.enc(!!) nodesNumber")
  //   console.log('\nThe file should be placed in ./../transfer_resources/asset_encrypted');
  //   console.log('\nThe splitted files will be placed in ./../transfer_resources/asset_encrypted_splitted\n');
  //   return
  // }

  // let filePath = __dirname + '/' + filename
  let filePath = './transfer_resources/asset_encrypted/' + filename

  const file_size = fs.statSync(filePath).size;
  let chunkSize = Math.ceil(file_size / nodesNumber);
  // console.log(chunkSize)


  await splitFile.splitFileBySize(filePath, chunkSize, "./transfer_resources/asset_encrypted_splitted")
    .then((names) => {
      console.log('\nThe splitted files were placed in ./transfer_resources/asset_encrypted_splitted\n');
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
    return 1
  }

module.exports={splitFiles}



