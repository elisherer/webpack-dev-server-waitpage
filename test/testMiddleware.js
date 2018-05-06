const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');

module.exports = (indexFilename) => {
  const indexFile = path.resolve(__dirname, '..', indexFilename);

  const state = {
    progress: 0,
    template: fs.readFileSync(indexFile, 'utf8')
  };

  //watch
  fs.watch(indexFile, (eventType, filename) => {
    if (filename === indexFilename) {
      console.log(`>> file ${indexFilename} changed. reloading...`);
      state.template = fs.readFileSync(indexFile, 'utf8');
      console.log(`>> reloading ${indexFilename} complete.`);
    }
  });

  setInterval(() => {
    state.progress = (state.progress + 0.1) % 1;
  }, 1000);

  return async (ctx/*, next*/) => {
    const total = 200, active = Math.round(total * state.progress);
    try {
      ctx.type = 'html';
      ctx.body = ejs.render(state.template, {
        title: 'Development Server (Test)',
        webpackVersion: webpack.version,
        webpackServeVersion: webpackServe.version,
        progress: [state.progress, 'Building Modules', active + '/200 modules', active + ' active', './' + indexFilename]
      });
    } catch (err) {
      console.error('>> ' + err);
      if (err.status !== 404) {
        throw err
      }
    }
  }
};