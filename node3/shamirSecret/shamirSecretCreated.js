async function shamirSecretCreated(testamentEncryptionPassword) {

    const sss = require('shamirs-secret-sharing')
    const fs = require("fs")

    const testamentorsNumber = 3
    const threshold = 2

    const shares = sss.split(testamentEncryptionPassword, { shares: testamentorsNumber, threshold: threshold })

    for (let count = 0; count < testamentorsNumber; count++) {
        // console.log(shares[count])
        var newKey = fs.createWriteStream('./transfer_resources/shamirKeys_created/shamirKey' + count + ".txt", {flags:"w"});
        newKey.write(shares[count].toString())
        newKey.end()
    }

}

module.exports={shamirSecretCreated}