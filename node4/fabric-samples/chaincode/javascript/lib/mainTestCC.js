// initialized apache and mysql via xampp

// Installations node.js:
// npm i topsis ((install the libriry for topsis))
// npm install fabric-network

// execute: node main.js

const express = require('express');
// const topsis = require("topsis");

// Creating variable migratioanalysis
var migratioanalysis = { "currentNode": "node4", "dateTime": 5 }

// calling function of migrationDecision:
var migDec = require('./migrationDecision');


const assets = [
    {
        ID: "asset2",
        name: 'app2',
        type: 5,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'running',
        currentNode: "node4",
        lastMigratedTime: 3,
    },
    {
        ID: "asset4",
        name: 'app4',
        type: 2,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'failed',
        currentNode: "node3",
        lastMigratedTime: 4,
    },
    {
        ID: "asset7",
        name: 'app7',
        type: 33,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'failed',
        currentNode: "node1",
        lastMigratedTime: 1,
    },
    {
        ID: "asset8",
        name: 'app8',
        type: 53,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'running',
        currentNode: "node4",
        lastMigratedTime: 10,
    },
    {
        ID: "asset1",
        name: 'app1',
        type: 15,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'running',
        currentNode: "node6",
        lastMigratedTime: 12,
    },
    {
        ID: "asset3",
        name: 'app3',
        type: 59,
        assetRequires: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        state: 'running',
        currentNode: "node3",
        lastMigratedTime: 7,
    },
];

const nodes = [
    {
        ID: "node1",
        nodeIP: '10.5.0.5',
        assetList: ["asset1"],
        runningStatus: 'failed',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 8,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 7,
        nwBW: 1},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}                
    },
    {
        ID: "node2",
        nodeIP: '10.5.0.6',
        assetList: ["asset2"],
        runningStatus: 'operational',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 7,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 2,
        nwBW: 1},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}
    },
    {
        ID: "node3",
        nodeIP: '10.5.0.7',
        assetList: ["asset3"],
        runningStatus: 'operational',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 6,
        nwBWUtilization: 55,
        RTT_ms: 3,
        Cores: 3,
        nwBW: 2},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}
    },
    {
        ID: "node4",
        nodeIP: '10.5.0.8',
        assetList: ["asset4"],
        runningStatus: 'operational',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 7,
        nwBWUtilization: 58,
        RTT_ms: 4,
        Cores: 4,
        nwBW: 1},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}
    },
    {
        ID: "node5",
        nodeIP: '10.5.0.9',
        assetList: ["asset5"],
        runningStatus: 'failed',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 8,
        nwBWUtilization: 53,
        RTT_ms: 5,
        Cores: 5,
        nwBW: 1},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}
    },
    {
        ID: "node6",
        nodeIP: '10.5.0.10',
        assetList: [""],
        runningStatus: 'failed',
        resourceStatus: {CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 6,
        nwBWUtilization: 57,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1},
        rttMapping:{tcpServerIP: "test",
        rtt:3,
        recordTime:4},
        addressDetails:{country:"bra",locality:"sp"}
    },
];

var out = migDec.migrationDecision(assets, nodes, migratioanalysis)


// TOPSIS testing
// const linearAlgebra = require('linear-algebra')(),
//     Vector = linearAlgebra.Vector,
//     Matrix = linearAlgebra.Matrix;

// let n = [[1, 3, 3], [3, 2, 1], [2, 1, 2], [2, 1, 3], [3, 3, 1], [1, 3, 2]]
// let m = new Matrix(n);
// let ia = ['min', 'min', 'max'];
// let w = [0.1, 0.6, 0.3];

// // TOPSIS library's function
// console.log("library TOPSIS result:")
// console.log(topsis.getBest(m, w, ia))

// console.log("_________________________________")

// console.log("Thesis TOPSIS result:")
// // TOPSIS FORMER THESIS
// var performTOPSIS = require('./performTOPSIS');
// let benefitMatrix = [0,0,1]
// let a = performTOPSIS.performTOPSIS(n, w, benefitMatrix)
// console.log(a)