const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // enables optimizations like minification
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js", // cache-busting
    path: path.resolve(__dirname, "build"),
    clean: true, // clear dist on each build
    publicPath: "/", // adjust if deploying under subpath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/, // asset imports
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "fonts/[name][hash][ext][query]" },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),       // minify JS
      new CssMinimizerPlugin(), // minify CSS
    ],
    splitChunks: {
      chunks: "all", // split vendor code
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(
        process.env.API_URL || "https://example.com"
      ),
    }),
    new HtmlWebpackPlugin({
        template: "./public/index.html", // use our index.html
        favicon: "./public/favicon.ico", // inject favicon
    })
  ],
};
