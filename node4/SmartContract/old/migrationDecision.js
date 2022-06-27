// each runtime has a list of actors running on it. Each actor is running in only one runtime (node)

// next step: pg 48, check if actor status is infoupdate or not

'use strict';

exports.migrationDecision = function (assets, nodes, migratioanalysis) {
    const stringify  = require('json-stringify-deterministic');
    // const performTOPSIS = require('./performTOPSIS');
    
    // query that makes a list of actors running on current node ordered according to migration time, from smaller to bigger
    var assetsRunning = []
    for (var assetIndex = 0; assetIndex<assets.length; assetIndex++) {
        if (assets[assetIndex].currentNode == migratioanalysis.currentNode)
        assetsRunning.push(assets[assetIndex])
    }

    // query to get list of possible candidate nodes for migration of actor
    // important features of the nodes:
    // runningStatus == 'operational'
    // node != currentNode (the node from where the actor is leaving)
    // CPU_Availabilty_percentage > 20%
    // RAM_Available_GB > 2GB
    // nwBWUtilization < 80%

    var candidateNodes = []
    for (var nodeIndex = 0; nodeIndex<nodes.length; nodeIndex++) {
        let node = nodes[nodeIndex]
        if (node.nodeId != migratioanalysis.currentNode && node.runningStatus == 'operational' && node.RAM_Available_GB > 3)
        candidateNodes.push(node)
    }
    
    delete candidateNodes["nodeId"]
    delete candidateNodes["runningStatus"]
    delete candidateNodes["docType"]
    
    return candidateNodes

    // Create TOPSIS matrix
    // dataMatrix is made by several pushs of runtimeResources, one for each node
    // runtimeResiurces is made 

    // Creation of dataMatrix, which gathers data from nodes
    var nodeMatrix = []
    var dataMatrix = []
    for (let i = 0; i < candidateNodes.length; i++) nodeMatrix.push(Object.values(candidateNodes[i]))
    for (let i = 0; i < candidateNodes.length; i++) dataMatrix.push(Object.values(candidateNodes[i]))
    // console.log("Node matrix:")
    // console.log(nodeMatrix)

    return dataMatrix

    // // node variables to be considered in the node selection for actor migration are:
    // // . CPU_Availabilty_percentage * Clock_Rate_GHz, 
    // // . RAM_Available_GB,
    // // . nwBWUtilization, 
    // // . RTT_ms, 
    // // . Cores, 
    // // . nwBW

    // // Performing TOPSIS in order to choose the node to which the actors should be migrated
    // // in the benefitMatrix, when 1: variable is beneficial. When 0, variable is maleficial and doesnt help node to be chosen
    // var benefitMatrix = [1, 1, 0, 0, 1, 1];
    // weightMatrix = [0.15, 0.15, 0.15, 0.25, 0.15, 0.15]
    // // weightMatrix = [0,0,0,0,1,0]
    // let topsisResult = performTOPSIS.performTOPSIS(dataMatrix, weightMatrix, benefitMatrix)

    // console.log("Result my TOPSIS:")
    // console.log(topsisResult)
    // let chosenNode = topsisResult.indexOf(Math.max.apply(null, topsisResult))
    // console.log("Node index:")
    // console.log(chosenNode)
    // console.log("Node array:")
    // console.log(nodeMatrix[chosenNode])
    // console.log("Node ID:")
    // console.log(nodeMatrix[chosenNode][0])

}
