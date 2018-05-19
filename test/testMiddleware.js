const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');
const SlowDownWebpackPlugin = require('./SlowDownWebpackPlugin');

module.exports = (wsOptions, indexFilename, seconds = 2) => {
  const indexFile = path.resolve(__dirname, '..', 'lib', indexFilename);

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

  // delay
  const compilers = wsOptions.compiler.compilers || [wsOptions.compiler];
  for (let i = 0 ; i < compilers.length ; i++) {
    const slowDownPlugin = new SlowDownWebpackPlugin(seconds);
    slowDownPlugin.apply(compilers[i]);
  }

  return async (ctx/*, next*/) => {
    const total = 200, active = Math.round(total * state.progress);
    ctx.type = 'html';
    ctx.body = ejs.render(state.template, {
      title: 'Development Server (Test)',
      webpackVersion: webpack.version,
      webpackServeVersion: webpackServe.version,
      progress: [
        [state.progress, 'Building Modules', active + '/200 modules', active + ' active', './' + indexFilename],
        //[(state.progress + 0.1) % 1, 'Building Modules', (active + 1) + '/200 modules', (active + 1) + ' active', './' + indexFilename] // test for multiple compilers
      ]
    });
  }
};