'use strict';

var request = require('request');

var url = 'http://api.tumblr.com/v2/blog/';
var path = '/posts?api_key=';

module.exports = function download(host, apiKey, callback) {
    request({
        url: url + host + path + apiKey,
        json: true
    }, function onTumblrResponse(err, res, body) {
        if (err || res.statusCode !== 200) {
            return callback(err || new Error('HTTP ' + res.statusCode));
        }

        callback(null, body.response.posts);
    });
};
