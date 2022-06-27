async function testamentorsKeysCreation(testamentorsAddress) {

    const sss = require('shamirs-secret-sharing')
    const fs = require("fs")

    const testamentorsNumber = testamentorsAddress.length

    let count = 0

    for (testamentorIP of testamentorsAddress) {
        randomKey = Math.random().toString(36).slice(2);
        var newKey = fs.createWriteStream('./transfer_resources/testamentorsKeys_created/testamentorsKey' + testamentorIP.slice(-1) + ".txt", {flags:"w"});
        newKey.write(randomKey)
        newKey.end()
        count ++
    }

}

module.exports={testamentorsKeysCreation}