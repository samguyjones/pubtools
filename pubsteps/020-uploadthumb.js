const { Plugin } = require('../src/plugin');
const { uploadImage } = require('../src/uploadfile');


class UploadThumb extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-thumb';
    }
    
      async execute(params) {
        await uploadImage(params.entry.thumbnail, this.settings);
    }
}

exports.operation = UploadThumb;