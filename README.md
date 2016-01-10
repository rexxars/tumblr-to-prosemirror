# tumblr-to-prosemirror

Convert tumblr blog entries to prosemirror format

## Installation

```
npm install --save tumblr-to-prosemirror
```

## Usage

```js
var convert = require('tumblr-to-prosemirror');

convert({
    host: 'vaffelfest.tumblr.com', // Some tumblr host. Just hostname, please.
    apiKey: 'someApiKey',
    json: false // Set to true if you want "plain old javascript objects" instead of actual ProseMirror `Node` instances.
}, function onConverted(err, posts) {
    if (err) {
        throw err;
    }

    console.log(posts);
});
```

Each item in the resulting array passed to the callback contains two keys: `tumblr` and `prosemirror`.  
- `tumblr` is the raw object returned by the tumblr API
- `prosemirror` is the "body" field of the post parsed to either a ProseMirror node (default) or a JSON structure, if `json` is set to `true` in the options. Note that the `body` field is only actually used for text posts, and each post type seems to have it's own field containing the HTML. `tumblr-to-prosemirror` will try to resolve that field in the following order:
  1. `body`
  2. `caption`
  3. `text`
  4. `description`

## License

MIT-licensed, see LICENSE
