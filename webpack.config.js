var path = require('path');
module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path:       __dirname,
    filename:   'bundle.js'
  },
  module: {
    loaders: [{
      loader:   'babel-loader',
      test:     /\.jsx?$/,
      exclude:  /node_modules/,
      query: {
        presets: ['es2015', 'stage-0']
      }
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    },{
      test: /\.json$/,
      loader: 'json'
    },{
      test: /\.yml$/,
      loader: 'json!yaml'
    },{
      test: /\.jade$/,
      loader: 'jade'
    }]
  }
};
