const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');

const data = {
  webpackVersion: webpack.version,
  webpackServeVersion: webpackServe.version,
  progress: [[0]],
};


/**
 * @typedef {object} WebpackServeWaitpageOptions
 * @property title {string}
 * @property theme {string}
 * @property template {string}
 * @property disableWhenValid {boolean}
 */


/** @type {WebpackServeWaitpageOptions} */
const defaultOptions = {
  title: 'Development Server',
  theme: 'default',
  disableWhenValid: true
};

/**
 * webpack-serve-waitpage middleware factory
 * @param wsOptions {{ compiler: Object }} The options argument passed to webpack-serve's 'add' function
 * @param [options] {WebpackServeWaitpageOptions} An optional object of options (see Readme for more information)
 * @returns {Function} Koa compatible middleware
 */
const webpackServeWaitpage = (wsOptions, options) => {
  if (!wsOptions || !wsOptions.compiler)
    throw new Error(`webpack-serve options must be supplied as first parameter`);

  /** @type {WebpackServeWaitpageOptions} */
  options = Object.assign({}, defaultOptions, options);

  const compilers = wsOptions.compiler.compilers || [wsOptions.compiler];
  for (let i = 0 ; i < compilers.length ; i++) {
    new webpack.ProgressPlugin(function() { data.progress[i] = arguments; }).apply(compilers[i]);
  }

  let template = options.template;
  if (!template) {
    if (fs.readdirSync(__dirname).filter(x => x.endsWith('.ejs')).map(x => x.slice(0,-4)).indexOf(options.theme) < 0)
      throw new Error(`Unknown theme provided: ${options.theme}`);
    template = fs.readFileSync(path.resolve(__dirname, options.theme + '.ejs'), 'utf8');
  }

  Object.keys(options).forEach(key => data[key] = options[key]); // expend data with options

  let wasValid = false;

  return async (ctx, next) => {
    const valid = data.progress.every(p => p[0] === 1);
    wasValid = wasValid || valid;

    if (
      valid || // already valid
      (options.disableWhenValid && wasValid) || // if after valid state should be disabled
      ctx.method !== 'GET' || // request is not a browser GET
      ctx.body != null || ctx.status !== 404) // response was already handled
      return await next();

    ctx.type = 'html';
    ctx.body = ejs.render(template, data);
  };
};

module.exports = webpackServeWaitpage;