'use strict';

var parse = require('./parse');
var download = require('./download');

module.exports = function convertTumblr(options, callback) {
    if (!options.host) {
        return setImmediate(callback, new Error('`options.host` must be specified'));
    }

    if (!options.apiKey) {
        return setImmediate(callback, new Error('`options.apiKey` must be specified'));
    }

    download(options.host, options.apiKey, function onResponse(err, posts) {
        if (err) {
            return callback(err);
        }

        callback(null, posts.map(function parsePost(post) {
            var bodyField = post.body || post.caption || post.text || post.description;
            var pmNode = bodyField && parse(bodyField, options.schema);
            return {
                raw: post,
                prosemirror: options.json && pmNode ? pmNode.toJSON() : pmNode
            };
        }));
    });
};

