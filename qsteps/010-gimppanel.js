const shell = require('child_process');
const IMAGE_COMMAND = "/usr/bin/flatpak run org.gimp.GIMP -i -b '(mass-panel-export \"%s%04d.xcf.gz\" \"%s\" %1.2d \"%s\")' -b '(gimp-quit 0)'";
const { Plugin } = require('../src/plugin');
const zeroFill = require('zero-fill');

class GimpPanel extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'gimp-panel';
    }

    execute(params) {
        for (let count = params.fromPanel;
            count <= params.toPanel; count++) {
            const myCommand = IMAGE_COMMAND
                .replace('%s', 'ir')
                .replace('%04d', zeroFill(4,count))
                .replace('%s', "640,320")
                .replace('%1.2d', '.75')
                .replace('%s', this.settings.imageDir);
            console.log(myCommand);
            shell.execSync(myCommand, { cwd: this.settings.sourceDir });
        }
    }
}

exports.operation = GimpPanel;