const { Plugin } = require('../src/plugin');
const { uploadBlog } = require('../src/uploadfile');


class UploadAtom extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-atom';
    }
    
    async execute(params) {
        await uploadBlog('feed.xml', this.settings);
    }
}

exports.operation = UploadAtom;