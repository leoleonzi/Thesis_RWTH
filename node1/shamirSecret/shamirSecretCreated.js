async function shamirSecretCreated(testamentEncryptionPassword, testamentorsAddress) {

    const sss = require('shamirs-secret-sharing')
    const fs = require("fs")

    const testamentorsNumber = testamentorsAddress.length
    const threshold = Math.ceil(testamentorsNumber/2)

    const shares = sss.split(testamentEncryptionPassword, { shares: testamentorsNumber, threshold: threshold })
    let count = 0

    for (testamentorIP of testamentorsAddress) {
        // console.log(shares[count])
        var newKey = fs.createWriteStream('./transfer_resources/shamirKeys_created/shamirKey' + testamentorIP.slice(-1) + ".txt", {flags:"w"});
        newKey.write(shares[count])
        newKey.end()
        count ++
    }

}

module.exports={shamirSecretCreated}