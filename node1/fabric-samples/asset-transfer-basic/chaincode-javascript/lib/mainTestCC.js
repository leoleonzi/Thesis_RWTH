// initialized apache and mysql via xampp

// Installations node.js:
// npm i topsis ((install the libriry for topsis))
// npm install fabric-network

// execute: node main.js

const express = require('express');
// const topsis = require("topsis");

// Creating variable migratioanalysis
var migratioanalysis = { "currentNode": 4, "dateTime": 5 }

// calling function of migrationDecision:
var migDec = require('./migrationDecision');


const assets = [
    {
        ID: "2",
        name: 'app2',
        type: 5,
        state: 'running',
        currentNode: 5,
        lastMIgratedTime: 3,
    },
    {
        ID: "4",
        name: 'app4',
        type: 2,
        state: 'failed',
        currentNode: 3,
        lastMIgratedTime: 4,
    },
    {
        ID: "7",
        name: 'app7',
        type: 33,
        state: 'failed',
        currentNode: 1,
        lastMIgratedTime: 1,
    },
    {
        ID: "8",
        name: 'app8',
        type: 53,
        state: 'running',
        currentNode: 4,
        lastMIgratedTime: 10,
    },
    {
        ID: "1",
        name: 'app1',
        type: 15,
        state: 'running',
        currentNode: 6,
        lastMIgratedTime: 12,
    },
    {
        ID: "3",
        name: 'app3',
        type: 59,
        state: 'running',
        currentNode: 3,
        lastMIgratedTime: 7,
    },
];

const nodes = [
    {
        ID: "1",
        nodeIP: '10.5.0.5',
        runningStatus: 'failed',
        CPU_Availability_percentage: 58,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 10,
        nwBWUtilization: 62,
        RTT_ms: 4,
        Cores: 6,
        nwBW: 1,
    },
    {
        ID: "2",
        nodeIP: '10.5.0.6',
        runningStatus: 'operational',
        CPU_Availability_percentage: 66,
        Clock_Rate_GHz: 1,
        RAM_Available_GB: 12,
        nwBWUtilization: 70,
        RTT_ms: 8,
        Cores: 3,
        nwBW: 10,
    },
    {
        ID: "3",
        nodeIP: '10.5.0.7',
        runningStatus: 'operational',
        CPU_Availability_percentage: 72,
        Clock_Rate_GHz: 2,
        RAM_Available_GB: 13,
        nwBWUtilization: 78,
        RTT_ms: 7,
        Cores: 3,
        nwBW: 10,
    },
    {
        ID: "4",
        nodeIP: '10.5.0.8',
        runningStatus: 'operational',
        CPU_Availability_percentage: 72,
        Clock_Rate_GHz: 1,
        RAM_Available_GB: 14,
        nwBWUtilization: 82,
        RTT_ms: 11,
        Cores: 2,
        nwBW: 1,
    },
    {
        ID: "5",
        nodeIP: '10.5.0.9',
        runningStatus: 'failed',
        CPU_Availability_percentage: 74,
        Clock_Rate_GHz: 2,
        RAM_Available_GB: 8,
        nwBWUtilization: 71,
        RTT_ms: 5,
        Cores: 4,
        nwBW: 10,
    },
    {
        ID: "6",
        nodeIP: '10.5.0.10',
        runningStatus: 'failed',
        CPU_Availability_percentage: 84,
        Clock_Rate_GHz: 3,
        RAM_Available_GB: 12,
        nwBWUtilization: 64,
        RTT_ms: 13,
        Cores: 2,
        nwBW: 12,
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