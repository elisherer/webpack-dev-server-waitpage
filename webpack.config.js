const path = require('path');
const webpackServeWaitpage = require('./index');
const testMiddleware = require('./test/testMiddleware');

function SlowDownWebpackPlugin(seconds = 5) {
  this.seconds = seconds;
}
SlowDownWebpackPlugin.prototype.apply = function(compiler) {
  compiler.hooks.make.tapAsync("SlowDownWebpackPlugin", async (compilation, callback) => {
    let progress = 0;
    let interval = setInterval(async () => {
      progress += (this.seconds / 100);
      if (progress >= 1) {
        clearInterval(interval);
        callback();
      }
    }, 1000);
  });
};

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './test/app.js',
  output: {
    filename: './output.js',
    path: path.resolve(__dirname)
  },
  plugins: [
    new SlowDownWebpackPlugin(),
    webpackServeWaitpage.plugin
  ],
};

module.exports.serve = {
  add: (app, middleware, options) => {

    // Use this to test an actual usage (you can change the seconds setting above to get more time)
    app.use(webpackServeWaitpage.middleware({
      title: 'Development Server (Dev)',
      theme: 'default'
    }));

    // Use this to only test the template using mock data
    app.use(testMiddleware('index.ejs'));
  }
};