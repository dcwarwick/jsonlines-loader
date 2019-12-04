<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# jsonlines-loader

A webpack loader for parsing [JSON Lines](https://jsonlines.org/) files into JavaScript objects.

JSON Lines files consist of zero to many 'lines' separated by linebreak characters '\n', with each
line containing a valid JSON value. They are often used for log files or data output.

jsonlines-loader enables JSON Lines files, which usually have a ".jsonl" extension, to be imported
directly into JavaScript. The contents of the file is delivered as an array of JavaScript objects,
each corresponding to one line of the JSON Lines file. Note that the array starts at index 1, which
is line 1 of the file; index 0 in the array is empty.

## Getting Started

To begin, you'll need to install `jsonlines-loader`:

```sh
$ npm install jsonlines-loader --save-dev
```

You can use the loader either:

- by configuring the `jsonlines-loader` in the `module.rules` object of the webpack configuration, or
- by directly using the `jsonlines-loader!` prefix to the require statement.

Suppose we have the following `jsonl` file:

**file.jsonl**

```json
// file.jsonl
{"source":"A","errors":13}
{"source":"B","errors":4}
{"source":"C","errors":984,"status":"critical"}
```

### Usage with preconfigured rule

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  entry: "./index.js",
  output: {
    /* ... */
  },
  module: {
    rules: [
      {
        // make all files ending in .jsonl use the `jsonlines-loader`
        test: /\.jsonl$/,
        use: "jsonlines-loader",
        type: "javascript/auto"
      }
    ]
  }
};
```

```js
// index.js
var data = require("./file.jsonl");
// or, in ES6
// import data from './file.jsonl'

console.log(data[1].errors); // 13
```

### Usage with require statement loader prefix

```js
var data = require("jsonlines-loader!./file.jsonl");

console.log(data[2].errors); // 4
```

## Options

### ignoreParseErrors

Ordinarily the Webpack build will fail if any of the lines of the JSON Lines file does not contain a valid
JSON value. If you set `ignoreParseErrors: true` then any line that does not contain a valid JSON value
will simply be copied into the delivered array as a string.

```js
// webpack.config.js
module: {
  rules: [
    {
      // make all files ending in .jsonl use the `jsonlines-loader`
      test: /\.jsonl$/,
      use: [
        (loader: "jsonlines-loader"),
        (options: { ignoreParseErrors: true })
      ],
      type: "javascript/auto"
    }
  ];
}
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/jsonlines-loader.svg
[npm-url]: https://npmjs.com/package/jsonlines-loader
[node]: https://img.shields.io/node/v/jsonlines-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/dcwarwick/json5-loader.svg
[deps-url]: https://david-dm.org/dcwarwick/json5-loader
[cover]: https://codecov.io/gh/dcwarwick/jsonlines-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/dcwarwick/jsonlines-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=jsonlines-loader
[size-url]: https://packagephobia.now.sh/result?p=jsonlines-loader
