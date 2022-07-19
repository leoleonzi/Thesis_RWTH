/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

// Creating variable migratioanalysis
var migratioanalysis = { "currentNode": "node4", "dateTime": 5 }

class AssetTransfer extends Contract {
    async InitLedger(ctx) {
        const assets = [
            {
                ID: "asset2",
                name: 'app2',
                currentNode: 'node4',
                testamentors: [],
                inheritor: "",
                type: 5,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'running',
                lastMigratedTime: 3,
            },
            {
                ID: "asset4",
                name: 'app4',
                currentNode: 'node3',
                testamentors: [],
                inheritor: "",
                type: 2,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'failed',
                lastMigratedTime: 4,
            },
            {
                ID: "asset7",
                name: 'app7',
                currentNode: 'node1',
                testamentors: [],
                inheritor: "",
                type: 33,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'failed',
                lastMigratedTime: 1,
            },
            {
                ID: "asset8",
                name: 'app8',
                currentNode: 'node4',
                testamentors: [],
                inheritor: "",
                type: 53,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'running',
                lastMigratedTime: 10,
            },
            {
                ID: "asset1",
                name: 'app1',
                currentNode: 'node1',
                testamentors: [],
                inheritor: "",
                type: 15,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'running',
                lastMigratedTime: 12,
            },
            {
                ID: "asset3",
                name: 'app3',
                currentNode: 'node3',
                testamentors: [],
                inheritor: "",
                type: 59,
                assetRequires: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 10,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                state: 'running',
                lastMigratedTime: 7,
            },
        ];

        const nodes = [
            {
                ID: "node1",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.11',
                assetList: ["asset1"],
                runningStatus: 'failed',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 8,
                    nwBWUtilization: 62,
                    RTT_ms: 4,
                    Cores: 7,
                    nwBW: 1,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
            {
                ID: "node2",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.12',
                assetList: ["asset2"],
                runningStatus: 'operational',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 7,
                    nwBWUtilization: 50,
                    RTT_ms: 1,
                    Cores: 3,
                    nwBW: 2,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
            {
                ID: "node3",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.13',
                assetList: ["asset3"],
                runningStatus: 'operational',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 4,
                    nwBWUtilization: 55,
                    RTT_ms: 3,
                    Cores: 2,
                    nwBW: 2,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
            {
                ID: "node4",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.14',
                assetList: ["asset4"],
                runningStatus: 'operational',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 7,
                    nwBWUtilization: 58,
                    RTT_ms: 4,
                    Cores: 4,
                    nwBW: 1,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
            {
                ID: "node5",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.15',
                assetList: ["asset5"],
                runningStatus: 'operational',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 8,
                    nwBWUtilization: 53,
                    RTT_ms: 5,
                    Cores: 5,
                    nwBW: 1,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
            {
                ID: "node6",
                publickey: "",
                publickeyConfigured:0,
                nodeIP: '10.5.0.16',
                assetList: [""],
                runningStatus: 'failed',
                resourceStatus: {
                    CPU_Availability_percentage: 58,
                    Clock_Rate_GHz: 3,
                    RAM_Available_GB: 6,
                    nwBWUtilization: 57,
                    RTT_ms: 4,
                    Cores: 6,
                    nwBW: 1,
                },
                rttMapping: {
                    tcpServerIP: "test",
                    rtt: 3,
                    recordTime: 4
                },
                nodeInfoTime: {creationDateTime: 0, lastHeartBeatDateTime: 0},
                addressDetails: { country: "bra", locality: "sp" }
            },
        ];


        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }

        for (const node of nodes) {
            node.docType = 'node';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(node.ID, Buffer.from(stringify(sortKeysRecursive(node))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, ID, name, type, state, currentNode, lastMigratedTime) {
        const exists = await this.AssetExists(ctx, ID);
        if (exists) {
            throw new Error(`The asset ${ID} already exists`);
        }

        const asset = {
            ID: ID,
            name: name,
            type: type,
            state: state,
            currentNode: currentNode,
            lastMigratedTime: lastMigratedTime,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    async ReadNode(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id, name, type, state, currentNode, lastMigratedTime) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            name: name,
            type: type,
            state: state,
            currentNode: currentNode,
            lastMigratedTime: lastMigratedTime,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newCurrentNode) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        asset.currentNode = newCurrentNode;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.docType == "asset") {
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return allResults;
    }

    async GetAllResults(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return allResults;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllNodes(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.docType == "node") {
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return allResults;
    }

    async QueryAssetsByOwner(ctx, owner) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'asset';
        queryString.selector.owner = owner;
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }

    // calling function of migrationDecision:
    async migrationDecision(ctx) {
        var migDec = require('./migrationDecision');
        var assets = await this.GetAllAssets(ctx)
        var nodes = await this.GetAllNodes(ctx)
        var chosenNode = migDec.migrationDecision(assets, nodes, migratioanalysis)
        return (chosenNode)

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        // return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // dataType: "assets" to return list of assets. "nodes" to return list of nodes
    async exportData(ctx, dataType) {
        var exportData = require('./exportData');
        var assets = await this.GetAllAssets(ctx)
        var nodes = await this.GetAllNodes(ctx)
        var returnData = exportData.exportData(assets, nodes, dataType)
        return (returnData)
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async setTestamentors(ctx, assetId, testamentorsList) {
        const assetString = await this.ReadAsset(ctx, assetId);
        const asset = JSON.parse(assetString);
        asset.testamentors = testamentorsList;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(assetId, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    async setInheritor(ctx, assetId, inheritor) {
        const assetString = await this.ReadAsset(ctx, assetId);
        const asset = JSON.parse(assetString);
        asset.inheritor = inheritor;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(assetId, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    async getTestamentors2(ctx, assetId) {
        const assetJSON = await this.ReadAsset(ctx, assetId);
        const asset = JSON.parse(assetJSON);
        return asset.testamentors;
    }

    async setHeartBeat(ctx, nodeId) {
        const nodeString = await this.ReadNode(ctx, nodeId);
        const node = JSON.parse(nodeString);
        node.nodeInfoTime.lastHeartBeatDateTime = Math.floor(Date.now() / 10000);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(nodeId, Buffer.from(stringify(sortKeysRecursive(node))));
    }

    async getHeartBeat(ctx, nodeId) {
        const nodeJSON = await this.ReadAsset(ctx, nodeId);
        const node = JSON.parse(nodeJSON);
        return node.nodeInfoTime.lastHeartBeatDateTime;
    }
    
    async getPublicKey(ctx, nodeId) {
        const nodeJSON = await this.ReadAsset(ctx, nodeId);
        const node = JSON.parse(nodeJSON);
        return node.publickey;
    }
    
    async setPublicKey(ctx, nodeId, publickey) {
        const nodeString = await this.ReadNode(ctx, nodeId);
        const node = JSON.parse(nodeString);
        if (node.publickeyConfigured == 0){
		node.publickeyConfigured = 1;
		node.publickey = publickey;	
		// we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        	return ctx.stub.putState(nodeId, Buffer.from(stringify(sortKeysRecursive(node))));		
        }        
    }
}
module.exports = AssetTransfer;


