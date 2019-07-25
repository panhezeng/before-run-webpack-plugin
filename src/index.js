const shell = require("shelljs");

export class BeforeRunWebpackPlugin {
  /**
   * options {cb, sed }
   * @param options
   */
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const optionsIsObj =
      Object.prototype.toString.call(this.options) === "[object Object]";

    let cb = () => {
      let outputPath = "docs";
      let srcPath = "index.html";
      shell.rm("-rf", outputPath);
      shell.mkdir(outputPath);
      shell.cp("-R", srcPath, outputPath);
      if (optionsIsObj && this.options.sed) {
        switch (this.options.sed) {
          case "react":
            shell.sed(
              "-i",
              /(react-dom|react)\.development\.js/g,
              "$1.production.min.js",
              outputPath + "/" + srcPath
            );
            break;
          case "vue":
            shell.sed("-i", "vue.js", "vue.min.js", outputPath + "/" + srcPath);
            break;
        }
      }
    };

    if (optionsIsObj) {
      if (
        /^\[object [^F]*Function\]$/.test(
          Object.prototype.toString.call(this.options.cb)
        )
      ) {
        cb = this.options.cb;
      }
    }

    const run = (compiler, callback) => {
      cb();
      callback();
    };

    // webpack4以上使用hooks
    if (compiler.hooks) {
      compiler.hooks.run.tapAsync("beforeRunWebpackPlugin", run);
    } else {
      compiler.plugin("run", run);
    }
  }
}
