function SlowDownWebpackPlugin(seconds = 1) {
  this.seconds = seconds;
}
SlowDownWebpackPlugin.prototype.apply = function(compiler) {
  compiler.hooks.make.tapAsync("SlowDownWebpackPlugin", async (compilation, callback) => {
    let progress = 0;
    let interval = setInterval(async () => {
      progress += 1 / this.seconds;

      if (progress >= 1) {
        clearInterval(interval);
        callback();
      }
    }, 1000);
  });
};

module.exports = SlowDownWebpackPlugin;