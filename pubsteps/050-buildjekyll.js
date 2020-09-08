const { Plugin } = require('../src/plugin');
const JEKYLL_BUILD_COMMAND = '/usr/local/bin/jekyll build -s /home/samjones/Dev/irblog/ -d /home/samjones/Dev/irblog/_site'
const shell = require('child_process');

class BuildJekyll extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'build-jekyll';
    }
    
    async execute(params) {
        shell.execSync(JEKYLL_BUILD_COMMAND);
    }
}

exports.operation = BuildJekyll;