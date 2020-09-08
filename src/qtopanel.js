#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const jsonFile = require('jsonfile');
const pluginPath = __dirname + '/../qsteps';
const {manifest, dayInterval, fetchOperations} = require(__dirname + '/operations');
let operations = [];
const optDef = [
    {
        name: 'panel',
        type: Number,
        defaultOption: true
    },
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
    },
    {
        name: 'from',
        alias: 'f',
        type: Number
    }
];

let options = commandLineArgs(optDef)

fetchOperations(pluginPath, options)
    .then((myOpts) => {
        operations = myOpts;
        return jsonFile.readFile(manifest);
    })
    .then(manifestData => {
        const entryCount = manifestData.entries.length;
        const lastEntry = manifestData.entries[entryCount - 1];
        const nextPanel = options.from  ||
          lastEntry.images[lastEntry.images.length - 1].sequence + 1;
        let nextDate = new Date(lastEntry.date);
        nextDate.setDate(nextDate.getDate() + dayInterval);
        operations.forEach(myOperation => {
            console.log('Running', myOperation.name);
            myOperation.execute({
                fromPanel: nextPanel,
                toPanel: options.panel,
                newDate: nextDate,
                newEntry: entryCount+1,
                manifestData: manifestData
            });
        });
    })
    .catch(error => {
        console.error('Write error:' + error);
    });