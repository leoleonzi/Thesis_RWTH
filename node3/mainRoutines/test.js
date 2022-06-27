const shell = require("shelljs")

var queryAssets = `peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}'`
var queryNodes = `peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllNodes"]}'`
var migrationDecisionCMD = `peer chaincode query -C mychannel -n basic -c '{"Args":["migrationDecision"]}'`


var queryAssetsResult = JSON.parse(shell.exec(queryAssets).stdout)

console.log("___________________\n")

var queryNodesResult = JSON.parse(shell.exec(queryNodes).stdout)


console.log("____\n")
// console.log(out.length)

const operationalNodesNr = queryNodesResult.filter(e => e.runningStatus === 'operational').length;

console.log(operationalNodesNr)


console.log("___________________\n")


var migrationDecisionResult = shell.exec(migrationDecisionCMD)
