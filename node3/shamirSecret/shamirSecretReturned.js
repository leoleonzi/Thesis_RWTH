function shamirSecretReturned(testamentorsNumber) {

    const sss = require('shamirs-secret-sharing')
    const fs = require("fs")

    const threshold = Math.ceil(testamentorsNumber/2)
    
    const shares = []
    const keysPath = './transfer_resources/shamirKeys_returned/'
    const keysFileNames = fs.readdirSync(keysPath)

    for (var keyName of keysFileNames) {
        var key = fs.readFileSync(keysPath + keyName)
        // console.log(key)
        shares.push(key)
    }
    console.log(shares)
    const recovered = sss.combine(shares)
    console.log("shamir recoverd key: " + recovered.toString()) // 'secret key'
}
module.exports = { shamirSecretReturned }
