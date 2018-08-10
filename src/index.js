const shell = require('shelljs')

export class BeforeRunWebpackPlugin {
  /**
   * options {cb, noSed, sed }
   * @param options
   */
  constructor (options) {
    this.options = options
  }

  apply (compiler) {

    const optionsIsObj = (Object.prototype.toString.call(this.options) === '[object Object]')

    let cb = function () {
      let outputPath = 'docs'
      let srcPath = 'index.html'
      shell.rm('-rf', outputPath)
      shell.mkdir(outputPath)
      shell.cp('-R', srcPath, outputPath)
      if (!(optionsIsObj && this.options.noSed)) {
        if (optionsIsObj && this.options.sed === 'react') {
          shell.sed('-i', /(react-dom|react)\.development\.min\.js/, '$1.production.js', outputPath + '/' + srcPath)
        } else {
          shell.sed('-i', '/vue.js', '/vue.min.js', outputPath + '/' + srcPath)
        }
      }
    }

    if (optionsIsObj) {
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
