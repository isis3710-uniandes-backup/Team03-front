const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index_bundle.html",
  favicon: "./public/favicon.ico"
});

module.exports = {
  entry: './src/app/index.js',
  output: {path:__dirname +'/src/public', filename: 'bundle.js'},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
plugins: [htmlPlugin]
}
