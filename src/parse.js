'use strict';

var jsdom = require('jsdom').jsdom;
var fromHTML = require('@bengler/prosemirror/dist/format').fromHTML;
var defaultSchema = require('@bengler/prosemirror/dist/model').defaultSchema;

var doc;

module.exports = function htmlToProseMirror(html, schema) {
    if (!doc) {
        doc = jsdom();
    }

    return fromHTML(schema || defaultSchema, html, { document: doc });
};

