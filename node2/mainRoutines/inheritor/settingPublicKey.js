const path = require('path');
const fs = require("fs")
const shell = require("shelljs")
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const assyncKeys = nacl.box.keyPair();

// setting own public key in the blockchain:
let setPublicKey = `docker exec cli peer chaincode invoke -o orderer3.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer3.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n chaincode --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["setPublicKey","` + nodeID + `","` + assyncKeys.publicKey + `"]}'`
shell.exec(setInheritor, { silent: false })

fs.writeFile('../../privateKey/privateKey.txt', assyncKeys.privateKey, {flag: "w"}, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
