function localMachineWorkflow(localMachineIP, testamentFileName, assetFileName, testamentorsNumber, assetID) {

    const mainEncryption = require("../../Encrypt_AES256/mainEncryption")
    const splitFiles = require("../../assetDivision/split-files")
    const http_server = require("../../http_server")
    const fs = require("fs")
    const renameAssetPiecesRandom = require("./renameAssetPiecesRandom")
    const shamirSecretCreated = require("../../shamirSecret/shamirSecretCreated")
    const path = require('path');
    const shell = require("shelljs")

    // Deleting useless files from last loop of this LM. 
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

    // initial state: asset stored in ./transfer_resources/asset_ready

    // create a random password for the asset encryption
    var assetEncryptionPassword = Math.random().toString(36).slice(2);
    console.log("--> Successfully created random password for asset encryption: " + assetEncryptionPassword + "\n")
    console.log("___________________________________\n")

    // encrypt the asset:
    mainEncryption.mainEncryption("asset_ready/", assetFileName, assetEncryptionPassword, "asset_encrypted/")
    console.log("--> Successfully encrypted the asset\n")
    console.log("___________________________________\n")

    // split the asset:
    setTimeout(function () {
        splitFiles.splitFiles(assetFileName + ".enc", testamentorsNumber)
    }, 6350)
    console.log("--> Successfully splitted the encrypted asset in pieces\n")
    console.log("___________________________________\n")


    // _______________________________________________________________________


    // run Chaincode TOPSIS function to choose inheritor(s):
    // BLOCK CHAIN!!!
    var migrationDecisionCMD = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["migrationDecision"]}'`
    var inheritorAddress = shell.exec(migrationDecisionCMD, { silent: true })
    inheritorAddress = inheritorAddress.substring(0, inheritorAddress.length - 1)
    // inheritorAddress = ["10.5.0.12"]
    console.log("Migration Decision executed. Chosen Inheritor IP: " + inheritorAddress + "\n")

    let setInheritor = `docker exec cli peer chaincode invoke -o orderer3.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer3.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n chaincode --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["setInheritor","` + assetID + `","` +  inheritorAddress + `"]}'`
    shell.exec(setInheritor, { silent: false })

    // choose the testamentors:
    // BLOCK CHAIN

    // var getAllNodes = `docker exec cli peer chaincode invoke -o orderer3.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer3.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n chaincode --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["GetAllNodes"]}'`
    var getAllNodes = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["exportData","nodes"]}'`
    // var queryNodesResult = JSON.parse(shell.exec(getAllNodes))
    var queryNodesResult = JSON.parse(shell.exec(getAllNodes, { silent: true }))
    var operationalNodes = queryNodesResult.filter(e => e.runningStatus === 'operational')
    var testamentorsAddress = []
    for (let operationalNode of operationalNodes) {
        if (operationalNode.nodeIP != inheritorAddress){
            testamentorsAddress.push(operationalNode.nodeIP)
        }
    }

    setTimeout(() => {
        // testamentorsAddress = ["10.5.0.13", "10.5.0.14", "10.5.0.15"]
        console.log("Testamentors chosen:" + testamentorsAddress + "\n")
    
        // Setting testamentors in the blockchain:
        
        let setTestamentors = `docker exec cli peer chaincode invoke -o orderer4.example.com:10050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer4.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n chaincode --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["setTestamentors","` + assetID + `","[` +  testamentorsAddress + `]"]}'`
        shell.exec(setTestamentors, { silent: true })
        console.log("Setting testamentors in the blockchain\n")
    
        // let queryTest = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["ReadAsset","` + assetID + `"]}'`
        // shell.exec(queryTest)
    
        console.log("___________________________________\n")
    }, 5000);

    // _______________________________________________________________________

    // create a random password for the testament encryption
    var testamentEncryptionPassword = Math.random().toString(36).slice(2);
    console.log("--> Successfully created random password for testament encryption\n")
    console.log("testamentEncryptionPassword: " + testamentEncryptionPassword)
    console.log("___________________________________\n")


    // rename the splitted pieces, in a way of putting random name order 
    // and create the testament
    setTimeout(function () {
        renameAssetPiecesRandom.renameAssetPiecesRandom(testamentorsNumber, assetEncryptionPassword, testamentorsAddress)
    }, 6400)
    console.log("--> Successfully renamed splitted encrypted file pieces\n")
    console.log("--> Successfully created testament\n")
    console.log("___________________________________\n")

    // encrypt the testament
    setTimeout(function () {
        mainEncryption.mainEncryption("testament_ready/", testamentFileName, testamentEncryptionPassword, "testament_encrypted/")
    }, 6500)
    console.log("--> Successfully encrypted the testament\n")
    console.log("___________________________________\n")

    // create Shamir's secret keys from the testament encryption key:
    setTimeout(function () {
        shamirSecretCreated.shamirSecretCreated(testamentEncryptionPassword, testamentorsAddress)
    }, 6600)
    console.log("--> Successfully created shamir secret keys from testament encryption password\n")
    console.log("___________________________________\n")

    // send the encrypted testament to the inheritor:
    setTimeout(function () {
        http_server.http_server(localMachineIP, "testament_encrypted/", testamentFileName + ".enc", "300" + inheritorAddress.slice(-1), inheritorAddress)
    }, 6700)

    // send shamir's secret keys to testamentors
    setTimeout(function () {
        var testamentorCount = 0
        for (const testamentorAddress of testamentorsAddress) {
            http_server.http_server(localMachineIP, "shamirKeys_created/", "shamirKey" + testamentorAddress.slice(-1) + ".txt", "301" + testamentorAddress.slice(-1), testamentorAddress)
            testamentorCount++
        }
    }, 6800)

    // send the asset pieces to all the testamentors:
    setTimeout(function () {
        var piecesNames = fs.readdirSync(__dirname + "/../../transfer_resources/asset_encrypted_splitted_renamed");
        var testamentorCount = 0
        for (const testamentorAddress of testamentorsAddress) {
            http_server.http_server(localMachineIP, "/../transfer_resources/asset_encrypted_splitted_renamed/", piecesNames[testamentorCount], "310" + testamentorAddress.slice(-1), testamentorAddress)
            testamentorCount++
        }
        setTimeout(function () {
            fs.unlinkSync("./transfer_resources/asset_encrypted/" + assetFileName + ".enc")
            console.log("==> Deleted file " + assetFileName + ".enc\n")

            // fs.unlinkSync("./transfer_resources/asset_ready/" + assetFileName)
            // console.log("==> Deleted file " + assetFileName)
        }, 6500)
    }, 6900)
}

module.exports = { localMachineWorkflow }