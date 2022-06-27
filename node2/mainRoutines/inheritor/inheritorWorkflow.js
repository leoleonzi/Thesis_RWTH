const { setInterval } = require("timers");

function inheritorWorkflow(thisNodeIP, localMachineIP, testamentFileName, testamentorsNumber, assetFileName, assetID, localMachineID) {

    const mainDecryption = require("../../Encrypt_AES256/mainDecryption")
    const mergeFiles = require("../../assetDivision/merge-files")
    const http_client = require("../../http_client")
    const shamirSecretReturned = require("../../shamirSecret/shamirSecretReturned")
    const path = require('path');
    const fs = require("fs")
    const shell = require("shelljs")

    const stateFileName = "asset_state.txt"
    
    const assyncKeys = nacl.box.keyPair();
    
    // setting own public key in the blockchain:
    let setPublicKey = `docker exec cli peer chaincode invoke -o orderer3.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer3.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n chaincode --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["setPublicKey","` + nodeID + `","` + assyncKeys.publicKey + `"]}'`
    shell.exec(setInheritor, { silent: false })


    // Deleting useless files from last loop of this Inheritor. 
    const oldAssetPieces = './transfer_resources/asset_encrypted_splitted_renamed/';
    fs.readdir(oldAssetPieces, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(oldAssetPieces, file), err => {
                if (err) throw err;
            });
        }
        console.log("==> Deleted old files\n")
    }
    );

    // Deleting useless files from last loop of this Inheritor. 
    try { fs.unlinkSync("./transfer_resources/asset_encrypted/" + assetFileName + ".enc") } catch (error) { }
    console.log("==> Deleted file " + assetFileName + ".enc\n")

    setTimeout(function () {
        // receive the encrypted testament and the asset state file 
        http_client.http_client(localMachineIP, "testament_encrypted/", testamentFileName + ".enc", "300" + thisNodeIP.slice(-1))
        http_client.http_client(localMachineIP, "asset_state_encrypted/", stateFileName + ".enc", "3900")
        console.log("==> Received the encrypted testament and the asset state file\n")
    }, 600)

    // Figure out testamentors addresses:
    // BLOCK CHAIN

    let queryTestamentorsAddress = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["getTestamentors2","` + "asset7" + `"]}'`
    var testamentorsAddress = shell.exec(queryTestamentorsAddress).slice(1, -2).split(",")
    // testamentorsAddress = ["10.5.0.13", "10.5.0.14", "10.5.0.15"]

    console.log("==> Received Testamentors addresses: " + testamentorsAddress + "\n")

    // request all Shamir's secret keys and Reassemble password from testament encryption with shamir secret keys:
    setTimeout(function () {
        used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        var getHeartBeatCMD = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["getHeartBeat","` + localMachineID + `"]}'`
        var checkHeartBeat = setInterval(() => {
            new Promise(function (resolve, reject) {
                var queryHeartBeat = shell.exec(getHeartBeatCMD, { silent: true })
                currentTime = Math.floor(Date.now() / 10000)
                if (currentTime - queryHeartBeat > 3) {
                    console.log("\nLocal Machine failed " + (currentTime - queryHeartBeat) + " timestamps ago")
                    clearInterval(checkHeartBeat)
                    resolve(200)
                }
                else console.log("\nLocal Machine is still up, with heartbeat: " + queryHeartBeat)
            }).then(function () {
                new Promise(function (resolve, reject) {
                    var oi, oi2
                    // request shamir keys
                    for (const testamentorAddress of testamentorsAddress) {
                        http_client.http_client(testamentorAddress, "shamirKeys_returned/", 'shamirKey' + testamentorAddress.slice(-1) + ".txt", "320" + thisNodeIP.slice(-1))
                        console.log("==> Receiving " + 'shamirKey' + testamentorAddress.slice(-1) + ".txt from " + testamentorAddress + ":" + "320" + thisNodeIP.slice(-1))
                    }
                    // request encrypted asset pieces
                    for (const testamentorAddress of testamentorsAddress) {
                        oi = http_client.http_client(testamentorAddress, "asset_encrypted_splitted_renamed/", 'encAssetPiece' + testamentorAddress.slice(-1), "321" + thisNodeIP.slice(-1))
                        oi2 = http_client.http_client(testamentorAddress, "asset_encrypted_splitted_renamed_redundant/", 'encAssetPiece' + testamentorAddress.slice(-1) + "-2", "322" + thisNodeIP.slice(-1))
                        console.log("==> Receiving " + 'encAssetPiece' + testamentorAddress.slice(-1) + " from " + testamentorAddress + ":" + "321" + thisNodeIP.slice(-1))

                    }
                    resolve(oi)
                    console.log("==> Requested all Shamir's secret keys\n")
                }).then(function (oi) {
                    setTimeout(function () {
                        var testamentPassword
                        testamentPassword = shamirSecretReturned.shamirSecretReturned(testamentorsNumber)
                        console.log("==> Reassembled password from testament encryption with shamir secret keys: " + testamentPassword + "\n")

                        // decrypt the testament and asset state file
                        let pathTestament = "testament_encrypted/"
                        let destinyTestamentPath = "testament_ready/"

                        new Promise(function (resolve, reject) {
                            mainDecryption.mainDecryption(testamentFileName + ".enc", testamentPassword, pathTestament, destinyTestamentPath)
                            mainDecryption.mainDecryption(stateFileName + ".enc", testamentPassword, "asset_state_encrypted/", "asset_state_ready/")
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
                                mergeFiles.mergerFiles("asset.jpg.enc")

                                setTimeout(function () {
                                    // decrypt asset
                                    mainDecryption.mainDecryption("asset.jpg.enc", assetEncryptionPassword, "asset_encrypted/", "asset_ready/")

                                    setTimeout(function () {
                                        // Deleting useless files from last loop of this Inheritor. 
                                        const oldAssetPieces = './transfer_resources/asset_encrypted_splitted_renamed/';
                                        fs.readdir(oldAssetPieces, (err, files) => {
                                            if (err) throw err;

                                            for (const file of files) {
                                                fs.unlink(path.join(oldAssetPieces, file), err => {
                                                    if (err) throw err;
                                                });
                                            }
                                            console.log("==> Deleted old files\n")
                                        }
                                        );

                                        // Deleting useless files from last loop of this Inheritor. 
                                        try { fs.unlinkSync("./transfer_resources/asset_encrypted/" + assetFileName + ".enc") } catch (error) { }
                                        console.log("==> Deleted file " + assetFileName + ".enc\n")

                                    }, 10000)
                                }, 3500)
                            }, 3500)
                        })
                    }, 3000)
                })
            })
        }, 3000);
    }, 3000)
}

module.exports = { inheritorWorkflow }
