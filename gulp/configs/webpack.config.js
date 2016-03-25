const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./main.config');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      include: path.join(__dirname, '../../js'),
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
      },
      '__DEBUG__': config.env !== 'production'
    })
  ],
  'eslint': {
    configFile: path.join(__dirname, '../../.eslintrc'),
    failOnWarning: false,
    failOnError: false
  }
};
