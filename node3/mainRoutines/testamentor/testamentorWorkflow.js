function testamentorWorkflow(thisNodeIP, localMachineIP, inheritorIP, localMachineID) {

    const http_server = require("../../http_server")
    const http_client = require("../../http_client")
    const path = require('path');
    const fs = require("fs")
    const shell = require("shelljs")


    try { fs.unlinkSync("./transfer_resources/assetPiece_asTestament/" + "encAssetPiece" + thisNodeIP.slice(-1)) } catch { }

    // receive a piece of the encrypted asset from Local Machine
    setTimeout(function () {
        var i = 0
        while (i < 2) {
            http_client.http_client(localMachineIP, "assetPiece_asTestament/", "encAssetPiece" + thisNodeIP.slice(-1) + "-" + i, "3" + (i+3) + "0" + thisNodeIP.slice(-1))
            i++
        }
        }, 1000)
    console.log("==> Received a piece of the encrypted asset from Local Machine\n")

    // receive a Shamir secret key from Local Machine
    setTimeout(function () {
        http_client.http_client(localMachineIP, "shamirKey_asTestament/", "shamirKey" + thisNodeIP.slice(-1) + ".txt", "301" + thisNodeIP.slice(-1))
    }, 1050)
    console.log("==> Received a Shamir secret key from Local Machine\n")

    var getHeartBeatCMD = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["getHeartBeat","` + localMachineID + `"]}'`
    var currentTime
    console.log("bench mark: " + Date.now())

    var checkingHeartBeat = setInterval(() => {
        // used = process.memoryUsage().heapUsed / 1024 / 1024;
        // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        new Promise(function (resolve, reject) {
            var queryHeartBeat = shell.exec(getHeartBeatCMD, { silent: true })
            currentTime = Math.floor(Date.now() / 10000)
            if (currentTime - queryHeartBeat > 2) {
                console.log("\nLocal Machine failed " + (currentTime - queryHeartBeat) + "timestamps ago")
                clearInterval(checkingHeartBeat)
                resolve(200)
            }
            else console.log("\nLocal Machine is still up, with heartbeat: " + queryHeartBeat)
        }).then(function () {

            // send the stored shamir secret key to the Inheritor
            setTimeout(function () {
                http_server.http_server(thisNodeIP, "shamirKey_asTestament/", "shamirKey" + thisNodeIP.slice(-1) + ".txt", "320" + inheritorIP.slice(-1), inheritorIP)
            }, 1100)
            console.log("==> Sending the stored shamir secret key to the Inheritor\n")


            // send the stored piece of the encrypted asset to the inheritor
            setTimeout(function () {
                var i = 0
                while (i < 2) {
                    http_server.http_server(thisNodeIP, "assetPiece_asTestament/", "encAssetPiece" + thisNodeIP.slice(-1) + "-" + i, "32" + (i+1) + inheritorIP.slice(-1), inheritorIP)
                    i++
                }
            }, 1250)
            console.log("==> Sending the stored piece of the encrypted asset to the inheritor\n")
        })
    }, 7000);



}

module.exports = { testamentorWorkflow }
