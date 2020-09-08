const { Plugin } = require('../src/plugin');
const { uploadFile } = require('../src/uploadfile');

class UploadManifest extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-manifest';
    }
    
    async execute(params) {
        await uploadFile('', '', this.settings.manifestTmp,
            this.settings.manifestName);
    }
}

exports.operation = UploadManifest;