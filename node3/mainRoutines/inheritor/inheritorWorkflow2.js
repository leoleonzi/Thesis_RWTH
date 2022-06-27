function inheritorWorkflow(thisNodeIP, localMachineIP, testamentFileName, testamentorsNumber, assetFileName, assetID) {

    const mainDecryption = require("../../Encrypt_AES256/mainDecryption")
    const mergeFiles = require("../../assetDivision/merge-files")
    const http_client = require("../../http_client")
    const shamirSecretReturned = require("../../shamirSecret/shamirSecretReturned")
    const path = require('path');
    const fs = require("fs")
    const shell = require("shelljs")


    setTimeout(function () {
        // receive the encrypted testament
        http_client.http_client(localMachineIP, "testament_encrypted/", testamentFileName + ".enc", "300" + thisNodeIP.slice(-1))
        console.log("==> Received the encrypted testament\n")
    }, 600)

    // Figure out testamentors addresses:
    // BLOCK CHAIN

    // let queryTestamentorsAddress = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["getTestamentors2","` + assetID + `"]}'`
    // var testamentorsAddress = shell.exec(queryTestamentorsAddress).slice(1, -2).split(",")
    testamentorsAddress = ["10.5.0.13", "10.5.0.14", "10.5.0.15"]

    console.log("==> Received Testamentors addresses: " + testamentorsAddress + "\n")

    // request all Shamir's secret keys and Reassemble password from testament encryption with shamir secret keys:
    setTimeout(function () {
        new Promise(function (resolve, reject) {
            var oi
            // request shamir keys
            for (const testamentorAddress of testamentorsAddress) {
                http_client.http_client(testamentorAddress, "shamirKeys_returned/", 'shamirKey' + testamentorAddress.slice(-1) + ".txt", "320" + thisNodeIP.slice(-1))
                console.log("==> Receiving " + 'shamirKey' + testamentorAddress.slice(-1) + ".txt from " + testamentorAddress + ":" + "320" + thisNodeIP.slice(-1))
            }
            // request encrypted asset pieces
            for (const testamentorAddress of testamentorsAddress) {
                oi = http_client.http_client(testamentorAddress, "asset_encrypted_splitted_renamed/", 'encAssetPiece' + testamentorAddress.slice(-1), "321" + thisNodeIP.slice(-1))
                console.log("==> Receiving " + 'encAssetPiece' + testamentorAddress.slice(-1) + " from " + testamentorAddress + ":" + "321" + thisNodeIP.slice(-1))

            }
            resolve(oi)
            console.log("==> Requested all Shamir's secret keys\n")
        }).then(function (oi) {
            setTimeout(function () {
                var testamentPassword
                testamentPassword = shamirSecretReturned.shamirSecretReturned(testamentorsNumber)
                console.log("==> Reassembled password from testament encryption with shamir secret keys: " + testamentPassword + "\n")

                // decrypt the testament
                let pathTestament = "testament_encrypted/"
                let destinyTestamentPath = "testament_ready/"

                new Promise(function (resolve, reject) {
                    mainDecryption.mainDecryption(testamentFileName + ".enc", testamentPassword, pathTestament, destinyTestamentPath)
                    resolve(200)
                }).then(function () {
                    // open the testament
                    setTimeout(function () {
                        const testamentText = fs.readFileSync("./transfer_resources/testament_ready/testament.txt", "utf-8")

                        // extract data from testament
                        var assetEncryptionPassword = testamentText.split(" ");
                        assetEncryptionPassword = assetEncryptionPassword[assetEncryptionPassword.length - 1]
                        assetEncryptionPassword = assetEncryptionPassword.substring(0, assetEncryptionPassword.length - 1);

                        console.log("asset encrypt password: " + assetEncryptionPassword)

                        // merge encrypted asset pieces
                        console.log("=> Merging encrypted asset pieces")
                        mergeFiles.mergerFiles("asset-test.jpg.enc")

                        setTimeout(function () {
                            // decrypt asset
                            mainDecryption.mainDecryption("asset-test.jpg.enc", assetEncryptionPassword, "asset_encrypted/", "asset_ready/")

                        }, 600)
                    }, 500)
                })
            }, 500)
        })
    }, 700)
}

module.exports = { inheritorWorkflow }
