module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    _: false,
    ActiveXObject: false
  }
};
