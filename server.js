// Module
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// File
const config = require('./webpack.config');

const host = 'localhost';
const port = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
}).listen(port, host, function(err, result) {
  if (err) console.log(err);
  console.log(`Listening at http://${ host }:${ port }`);
});
