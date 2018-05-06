const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');

const data = {
  webpackVersion: webpack.version,
  webpackServeVersion: webpackServe.version,
  progress: [0],
};

const defaultOptions = {
  title: 'Development Server',
  theme: 'default'
};

const waitPageMiddleware = {
  plugin: new webpack.ProgressPlugin(function(percentage) { data.progress = arguments; }),

  middleware: inputOptions => {
    const options = Object.assign({}, defaultOptions, inputOptions);
    let template = options.template;
    if (!template) {
      if (fs.readdirSync(__dirname).filter(x => x.endsWith('.ejs')).map(x => x.slice(0,-4)).indexOf(options.theme) < 0)
        throw new Error(`Unknown theme provided: ${options.theme}`);
      template = fs.readFileSync(path.resolve(__dirname, options.theme + '.ejs'), 'utf8');
    }
    Object.keys(options).forEach(key => data[key] = options[key]); // expend data with options

    return async (ctx, next) => {
      if (
        data.progress[0] === 1 || // already valid
        ctx.method !== 'GET' || // request is not a browser GET
        ctx.body != null || ctx.status !== 404) // response was already handled
        return await next();
      ctx.type = 'html';
      ctx.body = ejs.render(template, data);
    };
  }
};

module.exports = waitPageMiddleware;