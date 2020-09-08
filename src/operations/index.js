const glob = require('glob');
const settings = require('../settings.json');

function fetchOperations(pluginPath, options) {
    return fetchPlugins(pluginPath)
        .then((files) => {
            let myOpts = [];
            files.forEach(myFile => {
                let { operation } = require(pluginPath + '/' + myFile);
                let instance = new operation(settings);
                if (!skipOperation(instance, options)) {
                    myOpts.push(new operation(settings));
                }
            });
            return myOpts;
        });
}

function fetchPlugins(pluginPath) {
    return new Promise((resolve, reject) => {
        glob('*.js', {
            cwd: pluginPath
        }, function(error, files) {
            if (error) {
                reject(error);
            }
            resolve(files);    
        });
    });
}

function skipOperation(operation, options) {
    if (options.only && !options.only.includes(operation.name)) {
        return true;
    }
    if (options.skip && options.skip.includes(operation.name)) {
        return true;
    }
    return false;
}

module.exports = {
    manifest: settings.manifest,
    fetchOperations: fetchOperations,
    dayInterval: settings.dayInterval
};