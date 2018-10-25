const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server/package.json');

const data = {
  webpackVersion: webpack.version,
  webpackDevServerVersion: webpackDevServer.version,
  progress: [[0]],
};


/**
 * @typedef {object} WebpackDevServerWaitpageOptions
 * @property title {string}
 * @property theme {string}
 * @property template {string}
 * @property disableWhenValid {boolean}
 */


/** @type {WebpackDevServerWaitpageOptions} */
const defaultOptions = {
  title: 'Development Server',
  theme: 'default',
  disableWhenValid: true
};

/**
 * webpack-dev-server-waitpage middleware factory
 * @param server {Server} The server argument passed to webpack-dev-server's 'before' function
 * @param [options] {WebpackDevServerWaitpageOptions} An optional object of options (see Readme for more information)
 * @returns {Function} Koa compatible middleware
 */
const webpackDevServerWaitpage = (server, options) => {
  if (!server || !server.middleware || !server.middleware.context || !server.middleware.context.compiler)
    throw new Error(`webpack-dev-server's server argument must be supplied as first parameter (or is it missing server.middleware.context.compiler)`);

  /** @type {WebpackDevServerWaitpageOptions} */
  options = Object.assign({}, defaultOptions, options);

  const compilers = server.middleware.context.compiler.compilers || [server.middleware.context.compiler];
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

  return async (req, res, next) => {
    const valid = data.progress.every(p => p[0] === 1);
    wasValid = wasValid || valid;

    if (
      valid || // already valid
      (options.disableWhenValid && wasValid) || // if after valid state should be disabled
      req.method !== 'GET') // request is not a browser GET
      return await next();

    res.setHeader('Content-Type', 'text/html');
    res.end(ejs.render(template, data));
  };
};

module.exports = webpackDevServerWaitpage;