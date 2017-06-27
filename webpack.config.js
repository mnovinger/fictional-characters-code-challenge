var path = require('path');
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path:       __dirname,
    filename:   'bundle.js'
  },
  devtool: 'source-map',  
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
