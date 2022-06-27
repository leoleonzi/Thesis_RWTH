exports.performTOPSIS = function (dataMatrix, weightMatrix, benefitMatrix) {
    var dataMatrix = dataMatrix;
    var weightMatrix = weightMatrix;
    var benefitMatrix = benefitMatrix;
    // calculate square matrix
    var squareMatrix = [];
    var result = [];
    for (var i = 0; i < dataMatrix.length; i++) {
        for (var j = 0; j < dataMatrix[i].length; j++) {
            result.push(Math.pow(dataMatrix[i][j], 2));
        }
        squareMatrix.push(result);
        result = [];
    }
    // sum of each column of square matrix
    var sumSqrt = [];
    var sum = 0;
    for (var j = 0; j < squareMatrix[0].length; j++) {
        for (var i = 0; i < squareMatrix.length; i++) {
            sum = sum + squareMatrix[i][j];
        }
        sumSqrt[j] = Math.sqrt(sum);
        sum = 0;
    }
    // normalized matrix
    var normMatrix = [];
    var res = [];
    for (var i = 0; i < dataMatrix.length; i++) {

        for (var j = 0; j < dataMatrix[0].length; j++) {
            res.push(dataMatrix[i][j] / sumSqrt[j]);
        }
        normMatrix.push(res);
        res = [];
    }
    // multiply weight matrix with norm matrix
    var weightNormMatrix = [];
    var mul = [];
    for (var i = 0; i < normMatrix.length; i++) {
        for (var j = 0; j < normMatrix[0].length; j++) {
            mul.push(normMatrix[i][j] * weightMatrix[j]);
        }
        weightNormMatrix.push(mul);
        mul = [];
    }
    // PIS and NIS
    var PIS = [];
    var NIS = [];
    var col = [];
    for (var j = 0; j < benefitMatrix.length; j++) {
        for (var i = 0; i < weightNormMatrix.length; i++) {
            col[i] = weightNormMatrix[i][j];
        }
        if (benefitMatrix[j] == 1) {
            PIS[j] = Math.max.apply(null, col);
            NIS[j] = Math.min.apply(null, col);
        }
        else {
            PIS[j] = Math.min.apply(null, col);
            NIS[j] = Math.max.apply(null, col);
        }
        col = [];
    }
    // separation from ideal solution
    var distPIS = [];
    var distNIS = [];
    var diffPIS = [];
    var diffNIS = [];
    for (var i = 0; i < weightNormMatrix.length; i++) {
        for (var j = 0; j < weightNormMatrix[0].length; j++) {
            diffPIS.push(Math.pow((weightNormMatrix[i][j] - PIS[j]), 2));
            diffNIS.push(Math.pow((weightNormMatrix[i][j] - NIS[j]), 2));
        }
        distPIS.push(diffPIS);
        distNIS.push(diffNIS);
        diffPIS = [];
        diffNIS = [];
    }
    // sum and square root of diffPIS and diffNIS

    var sqrtPIS = [];
    var sqrtNIS = [];
    var sumPIS = 0;
    var sumNIS = 0;
    for (var i = 0; i < distPIS.length; i++) {
        for (var j = 0; j < distPIS[0].length; j++) {
            sumPIS += distPIS[i][j];
            sumNIS += distNIS[i][j];
        }
        sqrtPIS.push(Math.sqrt(sumPIS));
        sqrtNIS.push(Math.sqrt(sumNIS));
        sumPIS = 0;
        79
        sumNIS = 0;
    }
    // sum sqrtPIS and sqrtNIS
    var sumPISNIS = [];
    for (var i = 0; i < sqrtPIS.length; i++) {
        sumPISNIS.push(sqrtPIS[i] + sqrtNIS[i]);
    }
    // relative closeness
    var relativeClose = [];
    for (var i = 0; i < sqrtPIS.length; i++) {
        relativeClose.push(sqrtNIS[i] / sumPISNIS[i]);
    }
    return relativeClose;
}
//
