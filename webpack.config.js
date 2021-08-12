module.exports = {
  output: {
    filename: "before-run-webpack-plugin.min.js",
    libraryTarget: "commonjs2",
    library: "BeforeRunWebpackPlugin",
    libraryExport: "BeforeRunWebpackPlugin"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  externals: ["shelljs"]
};
