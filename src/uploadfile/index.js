const s3 = require('s3');
const awsClient = s3.createClient();

async function uploadFile(bucket, localBase, remoteBase, fileName, remoteFileName) {
    remoteFileName = remoteFileName || fileName;
    console.log('"' + remoteBase + remoteFileName + '"');
    return new Promise((resolve, reject) => {
        let uploader = awsClient.uploadFile({
            localFile: localBase + fileName,
            s3Params: {
                Bucket: bucket,
                Key:    remoteBase + remoteFileName,
                ACL: 'public-read'
            }
        });
        uploader.on('end', () => {
            resolve('Finished ' + remoteBase + remoteFileName);
        });
        uploader.on('error', (error) => {
            reject('Failed to upload:' + error.stack);
        })
    });
}

async function uploadImage(fileName, settings) {
    return uploadFile(settings.bucket, settings.imageDir, settings.remoteDir, fileName, false);
}

async function uploadBlog(filename, settings) {
    return uploadFile(settings.bucket,settings.blogDir, settings.blogRemoteDir, filename,
        false);
}

module.exports = {uploadImage, uploadBlog, uploadFile};