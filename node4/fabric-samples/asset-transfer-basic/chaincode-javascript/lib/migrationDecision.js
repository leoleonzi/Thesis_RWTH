// each runtime has a list of actors running on it. Each actor is running in only one runtime (node)

// next step: pg 48, check if actor status is infoupdate or not

'use strict';

const stringify = require('json-stringify-deterministic');

exports.migrationDecision = function (assets, nodes, migratioanalysis) {
    const stringify = require('json-stringify-deterministic');

    // query that makes a list of actors running on current node ordered according to migration time, from smaller to bigger
    var assetsRunning = []
    for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
        if (assets[assetIndex].currentNode == migratioanalysis.currentNode)
            assetsRunning.push(assets[assetIndex])
    }

    // assetsRunning.sort(function(a, b) {
    //     return a.lastMIgratedTime - b.lastMIgratedTime;
    // });

    // return assetsRunning

    // query to get list of possible candidate nodes for migration of actor
    // important features of the nodes:
    // runningStatus == 'operational'
    // node != currentNode (the node from where the actor is leaving)
    // CPU_Availabilty_percentage > 20%
    // RAM_Available_GB > 2GB
    // nwBWUtilization < 80%

    var candidates = []
    for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        let node = nodes[nodeIndex]
        if (node.ID != migratioanalysis.currentNode && node.runningStatus == 'operational' && node.RAM_Available_GB > 3)
            candidates.push(node)
    }
    console.log("Canditade nodes:")
    console.log(candidates)

    var candidateNodes = candidates.map(({ ID, docType, runningStatus, nodeIP, ...item }) => item);


    // Create TOPSIS matrix
    // dataMatrix is made by several pushs of runtimeResources, one for each node

    // Creation of dataMatrix, which gathers data from nodes
    var dataMatrix = []
    for (let i = 0; i < candidateNodes.length; i++) dataMatrix.push(Object.values(candidateNodes[i]))
    // console.log("Node matrix:")

    // console.log("Data matrix:")
    // return dataMatrix

    // // node variables to be considered in the node selection for actor migration are:
    // // . CPU_Availabilty_percentage *
    // // . Clock_Rate_GHz, 
    // // . RAM_Available_GB,
    // // . nwBWUtilization, 
    // // . RTT_ms, 
    // // . Cores, 
    // // . nwBW

    // // Performing TOPSIS in order to choose the node to which the actors should be migrated
    // // in the benefitMatrix, when 1: variable is beneficial. When 0, variable is maleficial and doesnt help node to be chosen
    var benefitMatrix = [1, 1, 1, 0, 0, 1, 1];
    var weightMatrix = [0.15, 0.1, 0.15, 0.15, 0.15, 0.15, 0.15]
    // weightMatrix = [0,0,0,0,1,0]
    var performTOPSIS = require('./performTOPSIS');
    let topsisResult = performTOPSIS.performTOPSIS(dataMatrix, weightMatrix, benefitMatrix)

    // console.log("Result my TOPSIS:")
    // console.log(topsisResult)
    let chosenNode = topsisResult.indexOf(Math.max.apply(null, topsisResult))
    console.log("\nNode selected:")
    console.log(candidates[chosenNode])
    console.log("\nSelected Node's ID:")
    console.log(candidates[chosenNode].ID)
    return candidates[chosenNode]
}
