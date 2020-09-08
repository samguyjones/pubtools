const { Plugin } = require('../src/plugin');
const { uploadBlog } = require('../src/uploadfile');
const invalidate = require('cloudfront-invalidate');
const DISTRIBUTION_ID = 'EYNVPTWQCSICU';

async function invalidPromise(distId, paths) {
    return new Promise((resolve, reject) => {
        invalidate(distId, paths, null, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

class Invalidate extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'invalidate';
    }
    
    async execute(params) {
        await invalidPromise(DISTRIBUTION_ID, [
            '/manifest.json',
            '/blog*',
            '/feed.xml'
        ]);
    }
}

exports.operation = Invalidate;