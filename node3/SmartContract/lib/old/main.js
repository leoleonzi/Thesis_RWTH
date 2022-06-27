// initialized apache and mysql via xampp

// Installations node.js:
// npm i topsis ((install the libriry for topsis))
// npm install fabric-network

// execute: node main.js

const mysql = require('mysql');
const express = require('express');
const topsis = require("topsis");

// Connecting with database:
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
});

// Creating variable migratioanalysis
var migratioanalysis = { "currentNode": 4, "dateTime": 5 }

// calling function of migrationDecision:
var migDec = require('./migrationDecision');
migDec.migrationDecision(db, migratioanalysis)


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