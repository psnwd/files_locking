const path = require('path');
module.exports = [{
  name: 'app',
  entry: './src/app.js',
  output: {
    filename: 'files_locking.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
}]