# Changelog
All notable changes to this project will be documented in this file.

## [0.2.0] - 2018-05-06
**Breaking Change** - the middleware is now a factory, and needs to be invoked to get the koa middleware.
i.e. `app.use(webpackServeWaitpage.middleware());`
- Added 2 predefined themes: dark and meterial.
- Template can be altered by providing a `template` in the middleware options object.
- Template now uses `ejs` for rendering.

## [0.1.0] - 2018-04-30
- First version