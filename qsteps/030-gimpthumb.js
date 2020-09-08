const shell = require('child_process');
const IMAGE_COMMAND = "/usr/bin/flatpak run org.gimp.GIMP -i -b '(mass-panel-export \"%s%04d.xcf.gz\" \"%s\" %1.2d \"%s\")' -b '(gimp-quit 0)'";
const { Plugin } = require('../src/plugin');
const zeroFill = require('zero-fill');

class GimpThumb extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'gimp-thumb';
    }

    execute(params) {
        const thumbCommand = IMAGE_COMMAND
            .replace('%s', 'snapshot')
            .replace('%04d', zeroFill(4, params.newEntry))
            .replace('%s', '96,300')
            .replace('%1.2d', '1')
            .replace('%s', this.settings.imageDir);
        console.log(thumbCommand);
        shell.execSync(thumbCommand, { cwd: this.settings.sourceDir });
    }
}

exports.operation = GimpThumb;