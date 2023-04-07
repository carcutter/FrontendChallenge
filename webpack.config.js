const path = require("path");
const package = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const commitHash = require("child_process").execSync("git rev-parse --short HEAD").toString().trim();

const BASE = {
  mode: "none",
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist/" + package.name + "/",
    filename: "bundle.min.js",
  },
  devServer: {
    static: path.join(__dirname, "serve"),
    port: 4200,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              exportType: "array",
              import: true,
              importLoaders: 0,
              esModule: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],
};

const DEV = {
  ...BASE,
  ...{
    devtool: "eval-cheap-module-source-map",
  },
};

module.exports = function (env, argv) {
  return DEV;
};
