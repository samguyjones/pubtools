const { Plugin } = require('../src/plugin');
const { uploadImage } = require('../src/uploadfile');


class UploadPanels extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'upload-panels';
    }
    
    imageFiles(images) {
        return images.reduce((imageList, myImage) => {
            for (let dimension in myImage.file) {
                imageList.push(myImage.file[dimension]);
                return imageList;
            }
        },[]);
    }

    async uploadImages(images) {
        return Promise.all(this.imageFiles(images).map((filename) => {
            return uploadImage(filename, this.settings);
        }));
    }
    
    async execute(params) {
        await this.uploadImages(params.entry.images);
    }
}

exports.operation = UploadPanels;