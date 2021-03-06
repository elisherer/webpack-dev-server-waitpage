# Changelog
All notable changes to this project will be documented in this file.

## [2.1.1] - 2020-12-11
- Fix #23 - Cannot read property 'includes' of undefined when disableWhenValid = false

## [2.1.0] - 2020-10-28
- Add `ignore` option to ignore certain urls or by request properties using function/s.
- Change material theme colors and progress starts at 12 o'clock and continues clockwise.  
- Add some unit tests

## [2.0.1] - 2020-09-10
- Try to fix peer dependency of webpack (v4 OR v5)

## [2.0.0] - 2020-08-24
- Add support for webpack 5 (see the latest setup instructions, also relevant to the latest v4)

## [1.0.0] - 2018-10-25 (renamed to webpack-dev-server-waitpage)
- Since `webpack-serve` is deprecated, the library migrated to the maintained library `webpack-dev-server`.
- Library renamed to `webpack-dev-server-waitpage`

## [1.0.2] - 2018-08-12
- Add TypeScript definitions (#8)
- Add some JSDoc and some newlines in the code.

## [1.0.1] - 2018-07-21
- Fix require path and rephrasing (#2)
- Break long pathnames to prevent overflow and add spacing between messages for better readability (#3)
- Add webpack-serve 2.0.0 as peerDep (#4)

## [1.0.0] - 2018-05-19
- First major release
- Added `disableWhenValid` option (as default true). This will stop the wait page from appearing after the application started.
- Updated the peer dependency of webpack-serve to v1
- Internal project reorganization

## [0.3.0] - 2018-05-09
**Breaking Change** - The library is now only a middleware, use it with the provided options of `add` with the optional additional middleware options (see README.md for details).
- No need for adding a plugin anymore (happens from within the middleware initialization)
- Added suBport for multiple webpack ocnfigurations (changed 3 predefined themes)

## [0.2.0] - 2018-05-06
**Breaking Change** - the middleware is now a factory, and needs to be invoked to get the koa middleware.
i.e. `app.use(webpackServeWaitpage.middleware());`
- Added 2 predefined themes: dark and meterial.
- Template can be altered by providing a `template` in the middleware options object.
- Template now uses `ejs` for rendering.

## [0.1.0] - 2018-04-30
- First version
