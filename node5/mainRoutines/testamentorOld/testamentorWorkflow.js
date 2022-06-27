function testamentorWorkflow(thisNodeIP, localMachineIP, inheritorIP) {

    const http_server = require("../../http_server")
    const http_client = require("../../http_client")
    const path = require('path');
    const fs = require("fs")
    const shell = require("shelljs")


    try{fs.unlinkSync("./transfer_resources/assetPiece_asTestament/" + "encAssetPiece" + thisNodeIP.slice(-1))}catch{}

    // receive a piece of the encrypted asset from Local Machine
    setTimeout(function () {
        http_client.http_client(localMachineIP, "assetPiece_asTestament/", "encAssetPiece" + thisNodeIP.slice(-1), "310" + thisNodeIP.slice(-1))
    }, 1000)
    console.log("==> Received a piece of the encrypted asset from Local Machine\n")

    // receive a Shamir secret key from Local Machine
    setTimeout(function () {
        http_client.http_client(localMachineIP, "shamirKey_asTestament/", "shamirKey" + thisNodeIP.slice(-1) + ".txt", "301" + thisNodeIP.slice(-1))
    }, 1050)
    console.log("==> Received a Shamir secret key from Local Machine\n")

    // send the stored shamir secret key to the Inheritor
    setTimeout(function () {
        http_server.http_server(thisNodeIP, "shamirKey_asTestament/", "shamirKey" + thisNodeIP.slice(-1) + ".txt", "320" + inheritorIP.slice(-1), inheritorIP)
    }, 1100)
    console.log("==> Sending the stored shamir secret key to the Inheritor\n")


    // send the stored piece of the encrypted asset to the inheritor
    setTimeout(function () {
        http_server.http_server(thisNodeIP, "assetPiece_asTestament/", "encAssetPiece" + thisNodeIP.slice(-1), "321" + inheritorIP.slice(-1), inheritorIP)
    }, 1250)
    console.log("==> Sending the stored piece of the encrypted asset to the inheritor\n")

}

module.exports = { testamentorWorkflow }
