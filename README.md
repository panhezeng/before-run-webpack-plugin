# before-run-webpack-plugin

## 说明

一个简单插件，在 webpack compiler 运行前，注入执行一个方法。
我写来是为了输出示例的，默认有个方法

```javascript
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
          /(react-dom|react)\.development\.js/,
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
```

参数
{cb, sed }

## 用法

`npm i @panhezeng/before-run-webpack-plugin -D`

```javascript
const BeforeRunWebpackPlugin = require("@panhezeng/before-run-webpack-plugin");

module.exports = {
  plugins: [
    new BeforeRunWebpackPlugin({
      cb: function() {
        console.log("before run");
      }
    })
  ]
};
```

## 编译

```bash
# install dependencies
npm install

# 编译插件
npm run build

# 发版
npm set registry https://registry.npmjs.org/ && npm set @panhezeng:registry https://registry.npmjs.org/ && npm publish --access public && npm set registry https://registry.npm.taobao.org/ && npm set @panhezeng:registry https://registry.npm.taobao.org/

# 发版patch
npm set registry https://registry.npmjs.org/ && npm set @panhezeng:registry https://registry.npmjs.org/ && npm version patch && npm publish --access public && npm set registry https://registry.npm.taobao.org/ && npm set @panhezeng:registry https://registry.npm.taobao.org/

```
