const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,   // handle .js and .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,          // CSS handled by style+css loaders
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
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
    extensions: [".js", ".jsx"], // allow imports without extension
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL || "http://localhost:4000")
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // use our index.html
      favicon: "./public/favicon.ico", // inject favicon
    })
  ],
  devServer: {
    static: path.resolve(__dirname, "build"), // serve from /dist
    port: 3000,                              // choose port
    open: true,                              // auto-open browser
    hot: true,                               // enable HMR
    historyApiFallback: true,
  },
};
