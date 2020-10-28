const path = require('path');
const webpackDevServerWaitpage = require('./lib');
const testMiddleware = require('./test/testMiddleware');
const SlowDownWebpackPlugin = require('./test/SlowDownWebpackPlugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './test/app.js',
  output: {
    filename: './output.js',
    path: path.resolve(__dirname)
  },
  plugins: [
    webpackDevServerWaitpage.plugin(),
    new SlowDownWebpackPlugin(1) // Amount of seconds to delay the completion of compilation
  ],
  devServer: {
    before: (app, server) => {

      // Use this to test an actual usage (you can change the seconds setting below to get more time)
      app.use(webpackDevServerWaitpage(server, {
        //title: 'Development Server (Dev)',
        theme: 'dark'
      }));

      // Use this to only test the template using mock data
      app.use(testMiddleware(server, 'material.ejs'));
    }
  }
};