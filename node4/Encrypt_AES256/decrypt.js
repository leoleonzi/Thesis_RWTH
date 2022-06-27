
exports.decrypt = function (fileName, password) {
    const crypto = require('crypto');
    const fs = require('fs');
    const path = require('path');
    const zlib = require('zlib');

    const file = '../transfer_resources/asset_encrypted/' + fileName

    const getCipherKey = require('./getCipherKey');
    // First, get the initialization vector from the file.
    const readInitVect = fs.createReadStream(file, { end: 15 });

    let initVect;
    readInitVect.on('data', (chunk) => {
        initVect = chunk;
    });

    // Once we’ve got the initialization vector, we can decrypt the file.
    readInitVect.on('close', () => {
        const cipherKey = getCipherKey.getCipherKey(password);
        const readStream = fs.createReadStream(file, { start: 16 });
        const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
        const unzip = zlib.createUnzip();
        // const writeStream = fs.createWriteStream('../transfer_resources/asset_ready/' + fileName + '.unenc');
        const writeStream = fs.createWriteStream('../transfer_resources/asset_ready/' + fileName.slice(0,-21) + Date.now() + '.jpg');
        // console.log(fileName.slice(0,-21) + Date.now() + '.jpg')

        readStream
            .pipe(decipher)
            .pipe(unzip)
            .pipe(writeStream);
    });
}