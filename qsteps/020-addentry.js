const { Plugin } = require('../src/plugin');
const zeroFill = require('zero-fill');

class AddEntry extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'add-entry';
    }

    makeEntry(fromPanel, toPanel, entryDate, entryNum) {
        let newEntry = {
            images: [],
            date: this.isoDate(entryDate),
            thumbnail: '/snapshot' + zeroFill(4, entryNum) + '-96.png'
        };
        for (let count = fromPanel; count <= toPanel; count++) {
            newEntry.images.push({
                file: {
                    '640px': '/ir' + zeroFill(4,count) + '-640.png'
                },
                sequence: count
            })
        }
        return newEntry;
    }

    execute(params) {
        params.manifestData.entries.push(this.makeEntry(params.fromPanel, params.toPanel, params.newDate,
            params.newEntry));
    }
}

exports.operation = AddEntry;