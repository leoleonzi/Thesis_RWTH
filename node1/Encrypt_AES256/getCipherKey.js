exports.getCipherKey = function (password) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password).digest();
}
