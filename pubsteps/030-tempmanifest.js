const { Plugin } = require('../src/plugin');
const {entryPublic} = require('../src/entrywhen');
const jsonFile = require('jsonfile');

class TempManifest extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'temp-manifest';
    }
    
    async execute(params) {
        params.manifest.entries =
            params.manifest.entries.filter(entryPublic);
        await jsonFile.writeFile(this.settings.manifestTmp, params.manifest, { spaces: 2 });
    }
}

exports.operation = TempManifest;