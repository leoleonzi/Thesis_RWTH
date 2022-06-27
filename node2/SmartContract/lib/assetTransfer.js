/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

// Creating variable migratioanalysis
var migratioanalysis = { "currentNode": 3, "dateTime": 5 }

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 2,
                name: 'app2',
                type: 5,
                state: 'running',
                currentNode: 5,
                lastMIgratedTime: 3,
            },
            {
                ID: 4,
                name: 'app4',
                type: 2,
                state: 'failed',
                currentNode: 3,
                lastMIgratedTime: 4,
            },
            {
                ID: 7,
                name: 'app7',
                type: 33,
                state: 'failed',
                currentNode: 1,
                lastMIgratedTime: 1,
            },
            {
                ID: 8,
                name: 'app8',
                type: 53,
                state: 'running',
                currentNode: 4,
                lastMIgratedTime: 10,
            },
            {
                ID: 1,
                name: 'app1',
                type: 15,
                state: 'running',
                currentNode: 6,
                lastMIgratedTime: 12,
            },
            {
                ID: 3,
                name: 'app3',
                type: 59,
                state: 'running',
                currentNode: 3,
                lastMIgratedTime: 7,
            },
        ];
        
        const nodes = [
            {
                ID: 1,
                nodeIP: '10.5.0.5',
                runningStatus: 'failed',
                CPU_AVailability_percentage: 58,
                Clock_Rate_GHz: 3,
                RAM_Available_GB: 10,
                nwBWUtilization: 62,
                RTT_ms: 4,
                Cores: 6,
                nwBW: 1,
            },
            {
                ID: 2,
                nodeIP: '10.5.0.6',
                runningStatus: 'operational',
                CPU_AVailability_percentage: 66,
                Clock_Rate_GHz: 1,
                RAM_Available_GB: 12,
                nwBWUtilization: 70,
                RTT_ms: 8,
                Cores: 3,
                nwBW: 10,
            },
            {
                ID: 3,
                nodeIP: '10.5.0.7',
                runningStatus: 'operational',
                CPU_AVailability_percentage: 72,
                Clock_Rate_GHz: 2,
                RAM_Available_GB: 13,
                nwBWUtilization: 78,
                RTT_ms: 7,
                Cores: 3,
                nwBW: 10,
            },
            {
                ID: 4,
                nodeIP: '10.5.0.8',
                runningStatus: 'operational',
                CPU_AVailability_percentage: 72,
                Clock_Rate_GHz: 1,
                RAM_Available_GB: 14,
                nwBWUtilization: 82,
                RTT_ms: 11,
                Cores: 2,
                nwBW: 1,
            },
            {
                ID: 5,
                nodeIP: '10.5.0.9',
                runningStatus: 'failed',
                CPU_AVailability_percentage: 74,
                Clock_Rate_GHz: 2,
                RAM_Available_GB: 8,
                nwBWUtilization: 71,
                RTT_ms: 5,
                Cores: 4,
                nwBW: 10,
            },
            {
                ID: 6,
                nodeIP: '10.5.0.10',
                runningStatus: 'failed',
                CPU_AVailability_percentage: 84,
                Clock_Rate_GHz: 3,
                RAM_Available_GB: 12,
                nwBWUtilization: 64,
                RTT_ms: 13,
                Cores: 2,
                nwBW: 12,
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
            await ctx.stub.putState(node.nodeId, Buffer.from(stringify(sortKeysRecursive(node))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
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
    async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
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
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        asset.Owner = newOwner;
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
            if (record.docType=="asset"){
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
            if (record.docType=="node"){
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
        var oi = migDec.migrationDecision(assets, nodes, migratioanalysis)
        return (oi)        
        
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        // return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

}

module.exports = AssetTransfer;
