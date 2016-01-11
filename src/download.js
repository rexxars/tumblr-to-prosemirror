'use strict';

var querystring = require('querystring');
var request = require('request');
var async = require('async');

var url = 'http://api.tumblr.com/v2/blog/';
var path = '/posts';

module.exports = function download(host, apiKey, callback) {
    var limit = 20;
    var offset = 0 - limit;
    var posts = [];
    var lastChunkSize = 0;

    async.doWhilst(function downloadChunk(cb) {
        offset += limit;

        request({
            url: url + host + path + '?' + querystring.stringify({
                api_key: apiKey, // eslint-disable-line camelcase
                limit: limit,
                offset: offset
            }),
            json: true
        }, function onTumblrResponse(err, res, body) {
            if (err || res.statusCode !== 200) {
                return cb(err || new Error('HTTP ' + res.statusCode));
            }

            lastChunkSize = body.response.posts.length;
            posts = posts.concat(body.response.posts);
            cb();
        });
    }, function shouldDownloadMore() {
        return lastChunkSize === limit;
    }, function onDownloadDone(err) {
        callback(err, err ? null : posts);
    });
};
