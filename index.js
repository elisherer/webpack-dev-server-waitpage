const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');

const waitPageHTML = fs.readFileSync(path.resolve(__dirname, 'waitpage.html'), 'utf8')
  .replace(/{{WP}}/g, webpack.version)
  .replace(/{{WPS}}/g, webpackServe.version);

const state = {
  progress: {},
  valid: false,
};

const waitPageMiddleware = {

  plugin: new webpack.ProgressPlugin((percentage, message, modules, active, last) => {
    const { progress } = state;

    progress.percent = Math.round(100 * percentage);
    progress.message = message || '';
    progress.modules = modules || '';
    progress.active = active || '';
    progress.last = last || '';

    state.valid = percentage === 1;
  }),

  middleware: async (ctx, next) => {

    if (state.valid || // already valid
      ctx.method !== 'GET' || // request is not a browser GET
      ctx.body != null || ctx.status !== 404) // response was already handled
      return await next();

    const { progress } = state;
    try {
      ctx.status = 200;
      ctx.body = waitPageHTML
        .replace(/{{PRC}}/g, progress.percent)
        .replace(/{{MSG}}/g, progress.message)
        .replace(/{{MDL}}/g, progress.modules)
        .replace(/{{ACT}}/g, progress.active)
        .replace(/{{LAST}}/g, progress.last);
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
};

module.exports = waitPageMiddleware;