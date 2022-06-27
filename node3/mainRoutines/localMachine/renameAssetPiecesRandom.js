
async function renameAssetPiecesRandom(peersNumber, assetEncryptionPassword, testamentorsAddress) {
    const { join, extname, basename } = require('path');
    var fs = require('fs');
    const crypto = require('crypto')

    const testamentFileName = "testament.txt"
    var piecesNames = []

    const pathToAssetPieces = "./transfer_resources/asset_encrypted_splitted"
    var testament = await fs.createWriteStream('./transfer_resources/testament_ready/' + testamentFileName, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    for (const oldFile of fs.readdirSync(pathToAssetPieces)) {
        const extension = extname(oldFile);
        var pieceRandomName = Math.random().toString(36).slice(2);

        var file = fs.readFileSync(join(pathToAssetPieces, oldFile), {flag:'r'})

        fs.renameSync(join(pathToAssetPieces, oldFile), join(pathToAssetPieces + "_renamed", oldFile));

        await testament.write(extension + " " + crypto.createHash('sha256').update(file).digest() + "\n") // append string to your file
        piecesNames.push(pieceRandomName)
    }

    testament.write("assetEncPassword " + assetEncryptionPassword +"\n")

    await testament.end() // close string
    console.log("Asset pieces successfully renamed and transfered to ./transfer_resources/asset_encrypted_splitted_renamed\n")
    console.log("Testament successfully created and stored in ./transfer_resources/testament_ready")
    return piecesNames
}

module.exports = { renameAssetPiecesRandom }
