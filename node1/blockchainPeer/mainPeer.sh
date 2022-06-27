# # docker pull hyperledger/fabric-peer:latest
# # !!!!
# docker pull hyperledger/fabric-peer:2.2
# # !!!!
# docker pull hyperledger/fabric-membersrvc:latest


# # docker run --rm -it -e CORE_VM_ENDPOINT=http://172.17.0.1:2375 -e CORE_LOGGING_LEVEL=DEBUG -e CORE_PEER_ID=vp0 -e CORE_PEER_ADDRESSAUTODETECT=true hyperledger/fabric-peer:2.2 peer node start
# # docker run --rm -it -e CORE_VM_ENDPOINT=http://172.17.0.1:2375 -e CORE_PEER_ID=vp1 -e CORE_PEER_ADDRESSAUTODETECT=true -e CORE_PEER_DISCOVERY_ROOTNODE=172.17.0.2:7051 hyperledger/fabric-peer:2.2 peer node start



mkdir -p ./hyperledger/docker-compose
cd ./hyperledger/docker-compose
