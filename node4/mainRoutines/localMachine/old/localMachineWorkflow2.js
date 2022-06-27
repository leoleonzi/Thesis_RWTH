async function localMachineWorkflow(localMachineIP, testamentFileName, assetFileName, peersNumber) {

    const mainEncryption = require("../../Encrypt_AES256/mainEncryption")
    const splitFiles = require("../../assetDivision/split-files")
    const http_server = require("../../http_server")
    const fs = require("fs")
    const renameAssetPiecesRandom = require("./renameAssetPiecesRandom")
    const shamirSecretCreated = require("../../shamirSecret/shamirSecretCreated")

    var assetEncryptionStatus = 0
    var assetDivisionStatus = 0
    var timeout = 300

    // initial state: asset stored in ./transfer_resources/asset_ready

    // create a random password for the asset encryption
    var assetEncryptionPassword = Math.random().toString(36).slice(2);
    console.log("--> Successfully created random password for asset encryption\n")
    console.log("___________________________________\n")

    // encrypt the asset:
    await mainEncryption.mainEncryption("asset_ready/", assetFileName, assetEncryptionPassword, "asset_encrypted/")
    console.log("--> Successfully encrypted the asset\n")
    console.log("___________________________________\n")


    // run Chaincode TOPSIS function to choose inheritor(s):
    // BLOCK CHAIN!!!

    // choose the testamentors:
    // BLOCK CHAIN!!!

    // split the encrypted asset:

    assetDivisionStatus = await splitFiles.splitFiles(assetFileName + ".enc", peersNumber)
    console.log("--> Successfully splitted the encrypted asset in pieces\n")
    console.log("___________________________________\n")

    // rename the splitted pieces, in a way of putting random name order and create the testament
    // --> needed peersNumber
    testamentFileName = await renameAssetPiecesRandom.renameAssetPiecesRandom(peersNumber)
    console.log("--> Successfully renamed splitted encrypted file pieces\n")
    console.log("--> Successfully created testament\n")
    console.log("___________________________________\n")

    // send the asset pieces to all the testamentors:
    // http_server(localMachineIP, ASSET PIECES!!!)

    // create a random password for the testament encryption
    var testamentEncryptionPassword = Math.random().toString(36).slice(2);
    console.log("--> Successfully created random password for testament encryption\n")
    console.log("___________________________________\n")

    // encrypt the testament
    await mainEncryption.mainEncryption("testament_ready/", testamentFileName, testamentEncryptionPassword, "testament_encrypted/")
    console.log("--> Successfully encrypted the testament\n")
    console.log("___________________________________\n")

    // send the encrypted testament to the inheritor:
    // setTimeout(function () {
    //     http_server.http_server(localMachineIP, "testament_encrypted/" + testamentFileName)
    // }, 1000)

    // create Shamir's secret keys from the testament encryption key:
    await shamirSecretCreated.shamirSecretCreated(testamentEncryptionPassword)
    console.log("--> Successfully created shamir secret keys from testament encryption password\n")
    console.log("___________________________________\n")

    // send shamir's secret keys to testamentors

}

module.exports = { localMachineWorkflow }
