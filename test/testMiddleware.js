const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server/package.json');

module.exports = (server, indexFilename) => {
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

  return async (req, res/*, next*/) => {
    const total = 200, active = Math.round(total * state.progress);
    res.setHeader('Content-Type', 'text/html');
    res.end(ejs.render(state.template, {
      title: 'Development Server (Test)',
      webpackVersion: webpack.version,
      webpackDevServerVersion: webpackDevServer.version,
      progress: [
        [state.progress, 'Building Modules', active + '/200 modules', active + ' active', './' + indexFilename],
        //[(state.progress + 0.1) % 1, 'Building Modules', (active + 1) + '/200 modules', (active + 1) + ' active', './' + indexFilename] // test for multiple compilers
      ]
    }));
  }
};