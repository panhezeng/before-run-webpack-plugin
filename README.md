# before-run-webpack-plugin

## 说明

一个简单插件，在webpack compiler运行前，注入执行一个方法。
我写来是为了输出示例的，默认有个方法

```javascript
   let cb = function () {
      let outputPath = 'docs'
      let srcPath = 'index.html'
      shell.rm('-rf', outputPath)
      shell.mkdir(outputPath)
      shell.cp('-R', srcPath, outputPath)
      shell.sed('-i', '/vue.js', '/vue.min.js', srcPath)
    }
```

参数
{cb}


## 用法

`npm i @panhezeng/before-run-webpack-plugin -D`

```javascript
const BeforeRunWebpackPlugin = require('before-run-webpack-plugin')

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
