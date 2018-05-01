[![npm version](https://badge.fury.io/js/webpack-serve-waitpage.svg)](https://badge.fury.io/js/webpack-serve-waitpage)

# webpack-serve-waitpage
Webpack progress wait page for [webpack-serve](https://github.com/webpack-contrib/webpack-serve)

Instead of waiting for webpack to finish compiling, see a nice progress wait page.

![screenshot](screenshot.png)

## Usage

#### webpack.config.js
```js
const webpackServeWaitpage = require('./libs/webpack-serve-waitpage');

...
  plugins: [

    // inside the plugins section of the config add the following
    webpackServeWaitpage.plugin,
  ],

...

module.exports.serve = {
  add: (app, middleware, options) => {

    // inside the add option function of serve add the following line
    app.use(webpackServeWaitpage.middleware);

  }
};

```
