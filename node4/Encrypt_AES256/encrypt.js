
exports.encrypt = async function (filepath, fileName, password, destinationPath) {
  const crypto = require('crypto');
  const fs = require('fs');
  const path = require('path');
  const zlib = require('zlib');

  const file = "./transfer_resources/" + filepath + fileName

  const AppendInitVect = require('./appendInitVect');
  const getCipherKey = require('./getCipherKey');
  // Generate a secure, pseudo random initialization vector.
  const initVect = crypto.randomBytes(16);

  // Generate a cipher key from the password.
  const CIPHER_KEY = getCipherKey.getCipherKey(password);
  const readStream = fs.createReadStream(file);
  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new AppendInitVect(initVect);
  // Create a write stream with a different file extension.
  const writeStream = fs.createWriteStream(path.join('./transfer_resources/' + destinationPath + fileName + ".enc"));

  readStream
    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream)
}