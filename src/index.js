const shell = require('shelljs')

export class BeforeRunWebpackPlugin {
  /**
   * options {cb}
   * @param options
   */
  constructor (options) {
    this.options = options
  }

  apply (compiler) {

    let cb = function () {
      let outputPath = 'docs'
      let srcPath = 'index.html'
      shell.rm('-rf', outputPath)
      shell.mkdir(outputPath)
      shell.cp('-R', srcPath, outputPath)
      shell.sed('-i', '/vue.js', '/vue.min.js', srcPath)
    }

    if (Object.prototype.toString.call(this.options) === '[object Object]') {
      if (Object.prototype.toString.call(this.options.cb) === '[object Function]') {
        cb = this.options.cb
      }
    }

    const run = (compiler, callback) => {
      cb()
      callback()
    }

    // webpack4以上使用hooks
    if (compiler.hooks) {
      compiler.hooks.run.tapAsync('beforeRunWebpackPlugin', run)
    } else {
      compiler.plugin('run', run)
    }
  }
}
