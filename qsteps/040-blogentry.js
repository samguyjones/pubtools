const { Plugin } = require('../src/plugin');
const fs = require('fs');
const POST_BASE = `---
layout: text
title:
date: yemoda
categories: post
---

Here's my latest comic:
[https://inhumaneresourcescomic.com/#/panel/startPanelNum](https://inhumaneresourcescomic.com/#/panel/startPanelNum).
`;

class BlogEntry extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'blog-entry';
    }

    execute(params) {
        let body = POST_BASE
          .replace(/yemoda/g, this.isoDate(params.newDate))
          .replace(/startPanelNum/g, params.fromPanel);
        let filename = this.settings.postDir + '/'
          + this.isoDate(params.newDate) + '-entry-' + params.newEntry
          + '.md';
        fs.writeFile(filename, body, (err) => {
            if (err) console.log('File error: ' + err);
            console.log('Blog entry started.');
        });
    }
}

exports.operation = BlogEntry;