const path = require('path');
const webpackServeWaitpage = require('./lib');
const testMiddleware = require('./test/testMiddleware');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './test/app.js',
  output: {
    filename: './output.js',
    path: path.resolve(__dirname)
  }
};

module.exports.serve = {
  add: (app, middleware, options) => {

    // Use this to test an actual usage (you can change the seconds setting below to get more time)
    app.use(webpackServeWaitpage(options, {
      title: 'Development Server (Dev)',
      theme: 'default'
    }));

    app.use(testMiddleware(options,
      'material.ejs',   // Use this to only test the template using mock data
      5                 // Amount of seconds to delay the completion of compilation
    ));
  }
};