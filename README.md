# before-run-webpack-plugin

## 说明

一个简单插件，在webpack compiler运行前，注入执行一个方法。
我写来是为了输出示例的，默认有个方法

```javascript
    let cb = () => {
      let outputPath = 'docs'
      let srcPath = 'index.html'
      shell.rm('-rf', outputPath)
      shell.mkdir(outputPath)
      shell.cp('-R', srcPath, outputPath)
      if (optionsIsObj && this.options.sed) {
        switch (this.options.sed) {
          case 'react':
            shell.sed('-i', /(react-dom|react)\.development\.js/, '$1.production.min.js', outputPath + '/' + srcPath)
            break
          case 'vue':
            shell.sed('-i', 'vue.js', 'vue.min.js', outputPath + '/' + srcPath)
            break
        }
      }
    }
```

参数
{cb, sed }


## 用法

`npm i @panhezeng/before-run-webpack-plugin -D`

```javascript
const BeforeRunWebpackPlugin = require('@panhezeng/before-run-webpack-plugin')

module.exports = {
  plugins: [
    new BeforeRunWebpackPlugin({cb: function() {
      console.log('before run')
    }})
  ]
}
```

# 发版
`npm version patch && npm publish --access public`
