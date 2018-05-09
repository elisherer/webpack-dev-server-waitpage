[![npm version](https://badge.fury.io/js/webpack-serve-waitpage.svg)](https://badge.fury.io/js/webpack-serve-waitpage)

# webpack-serve-waitpage
Webpack progress wait page for [webpack-serve](https://github.com/webpack-contrib/webpack-serve)

Instead of waiting for webpack to finish compiling, see a nice progress wait page.

![screenshot](screenshot.png)

## Installation

npm
```
npm install -D webpack-serve-waitpage
```

yarn
```
yarn add -D webpack-serve-waitpage
```

## Usage

#### webpack.config.js

Inside the `add` option function of `serve` add the following line.
You can provide options for the middleware (as 2nd parameter) `(i.e. app.use(webpackServeWaitpage(options, {})))` or ommit it as in the example below:

```js
const webpackServeWaitpage = require('./libs/webpack-serve-waitpage');

...

module.exports.serve = {
  add: (app, middleware, options) => {
    ...

    app.use(webpackServeWaitpage(options)); // * Be sure to pass the options argument from the arguments
  }
};

```

#### Middleware options

| Option |Description|Type|Default Value|
|--------|-----------|----|-------------|
|`title`|The window title|String|`"Development Server"`|
|`theme`|Use a predefined theme (Options are: `"default"`, `"dark"`)|String|`"default"`|
|`template`|Provide an alternative `ejs` template (overrides the `theme` option)|String|The default one|

* Any other option would be passed to the global scope of the ejs template


## Themes

There are other themes to choose from:

Dark

![Dark](screenshot3.png)

Material

![Material](screenshot2.png)

### *** And you can also create your own! ***

### Developing a new template

You can clone this repository and use the script `test` to help you develop a new template.
- Create a new ejs file (e.g. `my-theme.ejs`)
- Change the `webpack.config.js` filename argument of `testMiddleware` to yours (e.g. `testMiddleware('my-theme.ejs')`).
- Run `npm t`

#### Template data object

The `ejs` renderer gets a data object with the following values:
```js
{
    title: "Development Server", // the window title
    webpackVersion: "4.0.0", // currently used webpack version
    webpackServeVersion: "1.0.0", // currently used webpack-serve version
    progress: [ // number of object as number of webpack configurations
      [
        0.5, // progress between 0 to 1
        "message", // message from webpack
        "0/1000", // modules progress message
        "0 active", // active modules message
        "<some path>" // path of current module
      ]
    ]
}
```

