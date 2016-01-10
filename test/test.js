'use strict';

var convert = require('../src/convert');

convert({
    host: process.env.TUMBLR_HOST || 'vaffelfest.tumblr.com',
    apiKey: process.env.TUMBLR_API_KEY
}, function onConverted(err, posts) {
    if (err) {
        throw err;
    }

    console.log('===[ As PM node ]==========');
    console.log(posts);
    console.log('===========================');
});

convert({
    host: process.env.TUMBLR_HOST || 'vaffelfest.tumblr.com',
    apiKey: process.env.TUMBLR_API_KEY,
    json: true
}, function onConverted(err, posts) {
    if (err) {
        throw err;
    }

    console.log('===[ As JSON ]==========');
    console.log(posts);
    console.log('===========================');
});
