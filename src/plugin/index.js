const zeroFill = require('zero-fill');

class Plugin {
    constructor(settings) {
        this.settings = settings;
        this.name = undefined;
    }

    execute() {
        throw "Failure to implement 'execute'.";
    }

    isoDate(myDate)
    {
        if (myDate == null) {
            myDate = new Date();
        }
        return (myDate.getYear() + 1900) + "-" + zeroFill(2,myDate.getMonth() + 1) + "-"
            + zeroFill(2,myDate.getDate());
    }

    getName() {
        return this.name;
    }
}

exports.Plugin = Plugin;