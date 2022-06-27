'use strict';

const stringify = require('json-stringify-deterministic');

exports.exportData = function (assets, nodes, dataType) {
    const stringify = require('json-stringify-deterministic');

    // query that makes a list of actors running on current node ordered according to migration time, from smaller to bigger
    var assetsArray = []
    for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
        assetsArray.push(assets[assetIndex])
    }

    var nodesArray = []
    for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        let node = nodes[nodeIndex]
        nodesArray.push(node)
    }
    
    if (dataType=="assets"){
        return assetsArray
    }
    return nodesArray
}
