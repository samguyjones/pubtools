const { Plugin } = require('../src/plugin');
const { uploadBlog } = require('../src/uploadfile');


class UploadIndex extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-index';
    }
    
    async execute(params) {
        await uploadBlog('blog/index.html', this.settings);
    }
}

exports.operation = UploadIndex;