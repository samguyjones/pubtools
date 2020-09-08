const shell = require('child_process');
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
            const myCommand = this.settings.convertPanelCommand
                .replace('%04d', zeroFill(4,count))
                .replace('%1.2d', '.75')
                .replace('%s', this.settings.imageDir);
            console.log(myCommand);
            shell.execSync(myCommand, { cwd: this.settings.sourceDir });
        }
    }
}

exports.operation = GimpPanel;