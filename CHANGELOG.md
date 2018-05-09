# Changelog
All notable changes to this project will be documented in this file.

## [0.3.0] - 2018-05-09
**Breaking Change** - The library is now only a middleware, use it with the provided options of `add` with the optional additional middleware options (see README.md for details).
- No need for adding a plugin anymore (happens from within the middleware initialization)
- Added support for multiple webpack ocnfigurations (changed 3 predefined themes)

## [0.2.0] - 2018-05-06
**Breaking Change** - the middleware is now a factory, and needs to be invoked to get the koa middleware.
i.e. `app.use(webpackServeWaitpage.middleware());`
- Added 2 predefined themes: dark and meterial.
- Template can be altered by providing a `template` in the middleware options object.
- Template now uses `ejs` for rendering.

## [0.1.0] - 2018-04-30
- First version