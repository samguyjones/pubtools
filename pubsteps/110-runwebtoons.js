const { Plugin } = require('../src/plugin');
const JEKYLL_BUILD_COMMAND = '/usr/local/bin/jekyll build -s /home/samjones/Dev/irblog/ -d /home/samjones/Dev/irblog/_site'
const shell = require('child_process');

class RunTapas extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'run-webtoons';
    }
    
    async execute(params) {
        let command = 'env node /home/samjones/Dev/autopost/src/loadOne.js webtoons '
            + params.entry.thumbnail;
        command = params.entry.images.reduce((currentCommand, image) => {
            return currentCommand + ' ' + image.file['640px'];
        }, command);
        shell.execSync(command);
    }
}

exports.operation = RunTapas;