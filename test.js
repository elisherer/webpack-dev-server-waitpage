const fs = require('fs');
const path = require('path');
const {createHarness, mochaTapLike} = require('zora');
const isIgnored = require('./lib/isIgnored');

const config = {
  ignore: [/node_modules/,/^\./]
};

const CollectTests = (dirName, ignore) => {
  return fs.readdirSync(dirName).reduce((a, filePath) => {
    const absPath = path.join(dirName, filePath);
    if (isIgnored(ignore, { url: filePath })) return a;
    const stat = fs.statSync(absPath);
    if (stat.isDirectory()) {
      return a.concat(CollectTests(absPath));
    }
    if (absPath.endsWith(".test.js")) {
      a.push(absPath);
    }
    return a;
  }, []);
}

const tests = CollectTests(__dirname, config.ignore);
if (tests.length === 0) {
  console.log("No tests found.");
} else {
  const harness = createHarness();
  const {test} = harness;
  console.log(`Running ${tests.length} tests...`);
  tests.forEach(t => {
    console.log(`> Running ${t}...`);
    require(t)(test);
  });
  harness.report(mochaTapLike).then(() => {
    const exitCode = harness.pass === true ? 0 : 1;
    process.exit(exitCode);
  })
}