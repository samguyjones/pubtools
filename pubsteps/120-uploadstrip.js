const { Plugin } = require('../src/plugin');
const { uploadImage } = require('../src/uploadfile');
const zeroFill = require('zero-fill');

class UploadStrip extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-strip';
    }
    
      async execute(params) {
          const paddedEntry = zeroFill(4, params.newIndex);
          let stripFile = '/ir-entry-' + paddedEntry + '.png';
          console.log(stripFile);
          await uploadImage(stripFile, this.settings);
    }
}

exports.operation = UploadStrip;