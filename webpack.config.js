var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/js/index.js')]
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: 'build/',
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[id].min.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          env: {
            development: {
              presets: []
            }
          }
        } },
      { test: /\.s[ac]ss$/,
        loaders: ['style', 'css', 'sass'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body'
    })
  ]
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.keys(exports.entry).forEach(function (entry) {
      exports.entry[entry].unshift(
        'eventsource-polyfill',
        'webpack-hot-middleware/client');
    });

    exports.plugins.unshift(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin());

    break;

  default:
    // nothing
}
