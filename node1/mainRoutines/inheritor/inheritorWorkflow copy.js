function inheritorWorkflow(thisNodeIP, localMachineIP, testamentFileName, testamentorsNumber) {

    const mainDecryption = require("../../Encrypt_AES256/mainDecryption")
    const mergeFiles = require("../../assetDivision/merge-files")
    const http_client = require("../../http_client")
    const shamirSecretReturned = require("../../shamirSecret/shamirSecretReturned")

    const fs = require("fs")

    // receive the encrypted testament
    http_client.http_client(localMachineIP, "testament_encrypted/", testamentFileName + ".enc", "300" + thisNodeIP.slice(-1))
    console.log("==> Received the encrypted testament\n")

    // Figure out testamentors addresses:
    // BLOCK CHAIN
    var testamentorsAddress = ["10.5.0.13", "10.5.0.14", "10.5.0.15"]
    console.log("==> Received Testamentors addresses\n")

    // request all Shamir's secret keys
    setTimeout(function () {
        new Promise(function (resolve, reject) {
            var oi
            for (const testamentorAddress of testamentorsAddress) {
                oi = http_client.http_client(testamentorAddress, "shamirKeys_returned/", 'shamirKey' + testamentorAddress.slice(-1) + ".txt", "320" + thisNodeIP.slice(-1))
            }
            resolve(oi)
            console.log("==> Requested all Shamir's secret keys\n")
        }).then(function (oi) {
            setTimeout(function () {
                var testamentPassword
                testamentPassword = shamirSecretReturned.shamirSecretReturned(testamentorsNumber)
                console.log("==> Reassembled password from testament encryption with shamir secret keys: " + testamentPassword + "\n")
            }, 350)
        })
    }, 100)

    // Reassemble password from testament encryption with shamir secret keys:


    // // decrypt the testament
    // setTimeout(function () {
    //     console.log("testamentPassword: " + testamentPassword)
    //     mainDecryption.mainDecryption(fileName, testamentPassword)
    // }, 200)
    // console.log("==> Decrypted the testament\n")



    // open the testament
    // const assetEncryptionPassword = fs.read("../../transfer_resources/testament_ready/testament.txt", 'utf8')

    // request/store asset pieces
    setTimeout(function () {
        var testamentorCount = 0
        for (const testamentorAddress of testamentorsAddress) {
            http_client.http_client(testamentorAddress, "asset_encrypted_splitted_renamed/", 'encAssetPiece' + testamentorAddress.slice(-1), "321" + thisNodeIP.slice(-1))
            testamentorCount++
        }
    }, 350)

    // merge asset pieces
    // mergeFiles.mergerFiles("encrypted_asset.tar")

    // decrypt asset
    // mainDecryption.mainDecryption(assetFileName, assetEncryptionPassword)
}

module.exports = { inheritorWorkflow }