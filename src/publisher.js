#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const jsonFile = require('jsonfile');
const pluginPath = __dirname + '/../pubsteps';
const {manifest, fetchOperations} = require(__dirname + '/operations');
const {entryCurrent} = require(__dirname + '/entrywhen');
let operations = [];
const optDef = [
    {
        name: 'skip',
        alias: 's',
        type: String,
        multiple: true
    },
    {
        name: 'only',
        alias: 'o',
        type: String,
        multiple: true
    }
];

let options = commandLineArgs(optDef)

fetchOperations(pluginPath, options)
    .then((myOpts) => {
        operations = myOpts;
        return jsonFile.readFile(manifest);
    })
    .then((manifestData) => {
        const newEntry = manifestData.entries.find(entryCurrent);
        if (!newEntry) {
            console.log('NoEntry ready for publication.');
            return;
        }
        const newIndex = manifestData.entries.indexOf(newEntry) + 1;
        operations.forEach(myOperation => {
            console.log('Running', myOperation.name);
            myOperation.execute({
                entry: newEntry,
                newIndex: newIndex,
                manifest: manifestData
            });
        });
    })
    .catch(error => {
        console.error('Publish error:', error);
    });