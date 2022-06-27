function shamirSecretReturned(testamentorsNumber) {

    const sss = require('shamirs-secret-sharing')
    const fs = require("fs")

    const shares = []
    const keysPath = './transfer_resources/shamirKeys_returned/'
    const keysFileNames = fs.readdirSync(keysPath)

    for (var keyName of keysFileNames) {
        var key = fs.readFileSync(keysPath + keyName)
        shares.push(key)
    }
    const recovered = sss.combine(shares)
    console.log("shamir recoverd key: " + recovered) // 'secret key'
    return recovered
}
module.exports = { shamirSecretReturned }
