const BeforeRunWebpackPlugin = require("../dist/before-run-webpack-plugin.min");
const path = require("path");
const outputPath = path.resolve(__dirname, "../docs");

const config = {
  output: {
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|dist/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: []
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(
      new BeforeRunWebpackPlugin({ sed: "react", outputPath: outputPath })
    );
  }
  return config;
};
