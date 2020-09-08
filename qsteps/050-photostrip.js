const { Plugin } = require('../src/plugin');
const shell = require('child_process');
const zeroFill = require('zero-fill');
const FUSE_COMMAND = "montage -tile 1x -geometry +4+4 -background black "
const HEAD_COMMAND = 'convert -append entry-header.png ';
const FOOTER_FILE = ' entry-footer.png ';

class PhotoStrip extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'photo-strip';
    }

    execute(params) {
        let fuseCommand = FUSE_COMMAND;
        let destination = 'ir-entry-' + zeroFill(4, params.newEntry)
            + '.png';
        for (let count = params.fromPanel; count <= params.toPanel; count++)
        {
            fuseCommand += 'ir' + zeroFill(4,count) + '-320.png ';
        }
        fuseCommand += destination;
        console.log(fuseCommand);
        shell.execSync(fuseCommand, { cwd: this.settings.imageDir});
        let headCommand = HEAD_COMMAND + destination + FOOTER_FILE +
          destination;
        shell.execSync(headCommand, { cwd: this.settings.imageDir });
    }
}

exports.operation = PhotoStrip;