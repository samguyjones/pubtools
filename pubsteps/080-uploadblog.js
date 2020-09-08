const { Plugin } = require('../src/plugin');
const { uploadBlog } = require('../src/uploadfile');
const zeroFill = require('zero-fill');

function getBlogEntryName(entryCount, format) {
    let filename = format;
    let now = new Date();
    return filename.replace(':year', now.getFullYear())
      .replace(':month', zeroFill(2,now.getMonth() + 1))
      .replace(':day', zeroFill(2, now.getDate()))
      .replace(':entryNum', entryCount);
}

class UploadBlog extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-blog';
    }
    
    async execute(params) {
        await uploadBlog(getBlogEntryName(params.manifest.entries.length,
            this.settings.blogFormat), this.settings);
    }
}

exports.operation = UploadBlog;