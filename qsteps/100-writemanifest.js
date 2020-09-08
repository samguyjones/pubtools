const { Plugin } = require('../src/plugin');
const jsonFile = require('jsonfile');

class WriteManifest extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'write-manifest';
    }

    execute(params) {
        jsonFile.writeFile(this.settings.manifest, params.manifestData, {
            spaces: 2
        });
    }
}

exports.operation = WriteManifest;