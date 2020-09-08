const { Plugin } = require('../src/plugin');
const Twitter = require("twitter");
const zeroFill = require('zero-fill');

// Access Token 1174165881527635968-d3PMZu8Wxsc6BncQkJZOjC25NL1ETT
// Access Token Secret Me9KqNM847xY0umwFAE7q5KiaU74mU7WOP0cpX23tW51R
// Api Key OqgMXxlfQeqUzLvn5jdwCLa5P
// Api Secret Xj0GLb6CuOFhtru5H8bKqphsMFnoA9n6kXuAklKcrGzYv22rsw
class PostTwitter extends Plugin {
    constructor(settings) {
        super(settings);
        this.name = 'post-twitter';
    }

    async execute(params) {
        let client = new Twitter({
            consumer_key: this.settings.twitterApiKey,
            consumer_secret: this.settings.twitterApiSecret,
            access_token_key: this.settings.twitterTokenKey,
            access_token_secret: this.settings.twitterTokenSecret
        });

        const paddedEntry = zeroFill(4, params.newIndex);
        const stripFile = '/ir-entry-' + paddedEntry + '.png';
        const imageData = require('fs').readFileSync(this.settings.imageDir + stripFile);

        await client.post('media/upload', {media: imageData})
            .then( (response) => {
                client.post('statuses/update', {
                    media_ids: response.media_id_string,
                    status: 'Inhumane Resources, entry ' + params.newIndex
                     + ' ' + this.settings.comicUrl + '#/panel/' + params.entry.images[0].sequence
                });
            });

        // await client.post('statuses/update', {
        //     status: stripUrl
        // });
    }
}


exports.operation = PostTwitter;