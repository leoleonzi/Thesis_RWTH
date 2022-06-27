
// 1st step: identify the node's role for a specific asset:
// role options: "Local_Machine", "Inheritor", "Testamentor", "Other"

// const asset_id =
// const node_id = 
// const role = pull info from blockchain (aaset_id, node_id)



const fs = require("fs")
const localMachineWorkflow = require("./mainRoutines/localMachine/localMachineWorkflow")
const inheritorWorkflow = require("./mainRoutines/inheritor/inheritorWorkflow")
const testamentorWorkflow = require("./mainRoutines/testamentor/testamentorWorkflow")
const shell = require("shelljs")
const { setTimeout } = require("timers")

const assetID = "asset7"
const assetFileName = "asset.jpg"


const testamentFileName = "testament.txt"
var peerRole = ""
const testamentorsNumber = 3

const thisNodeID = "node4"
const thisNodeIP = "10.5.0.14"

// const localMachineIP = "10.5.0.11"

// const inheritorIP = "10.5.0.12"

// BLOCK CHAIN!!!
var assetQueryCMD = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["exportData","assets"]}'`
var assetCurrent
var testamentorsAddress = []

// Identifying the node's role, by checking the asset parameters
var timer = setInterval(function () {
    var queryAssetsResult = JSON.parse(shell.exec(assetQueryCMD, { silent: true }))
    assetCurrent = queryAssetsResult.filter(e => e.ID === assetID)["0"]
    console.log("\nassetCurrent: " + assetCurrent.ID)
    console.log("\nasset's current node: " + assetCurrent.currentNode)
    console.log("\nasset's inheritor: " + assetCurrent.inheritor)
    try{testamentorsAddress = assetCurrent.testamentors.slice(1, -1).split(",")
    console.log("\nasset's testamentors: " + testamentorsAddress)
    console.log("\nthis node IP: " + thisNodeIP)

}catch{}

    new Promise(function (resolve, reject) {
        if (thisNodeID == assetCurrent.currentNode) {
            peerRole = "Local_Machine"
            clearInterval(timer)
            resolve(peerRole)
        }
        else if (testamentorsAddress.includes(thisNodeIP)) {
            peerRole = "Testamentor"
            clearInterval(timer)
            resolve(peerRole)
        }
        else if (thisNodeIP == assetCurrent.inheritor) {
            peerRole = "Inheritor"
            clearInterval(timer)
            resolve(peerRole)
        }
        else peerRole = ""
    }).then(function(peerRole){
        console.log("peerRole: " + peerRole)
        
        // Figuring out local machine ip and inheritor ip by checking asset parameters
        var nodeQueryCMD = `docker exec cli peer chaincode query -n chaincode -C mychannel -c '{"Args":["exportData","nodes"]}'`
        var queryNodesResult = JSON.parse(shell.exec(nodeQueryCMD, { silent: true }))
        const localMachineIP = queryNodesResult.filter(e => e.ID === assetCurrent.currentNode)["0"].nodeIP

        
        console.log("\nLocal machine IP: " + localMachineIP)

        if (peerRole == "Local_Machine") {
            console.log("\nThis node is a Testator related to asset: " + assetID)
            localMachineWorkflow.localMachineWorkflow(thisNodeIP, testamentFileName, assetFileName, testamentorsNumber, assetID)
        }
        
        else if (peerRole == "Inheritor") {
            console.log("\nThis node is an Inheritor related to asset: " + assetID)
            inheritorWorkflow.inheritorWorkflow(thisNodeIP, localMachineIP, testamentFileName, testamentorsNumber)
        }
        
        else if (peerRole == "Testamentor") {
            console.log("\nInheritor node: " + assetCurrent.inheritor)
            console.log("\nThis node is an Testamentor related to asset: " + assetID)
            testamentorWorkflow.testamentorWorkflow(thisNodeIP, localMachineIP, assetCurrent.inheritor, assetCurrent.currentNode)
        }
        
        else {
            otherWorkflow()
        }
        
        function otherWorkflow() {
            console.log("\nThis node has no role within this network")
        }

    })


}, 3000)


