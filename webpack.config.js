var webpack       = require('webpack');
var getConfig     = require('hjs-webpack');
var path          = require('path');

var config = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  // Use devServer.proxy to specify proxies
  devServer: {
    proxy: {
      context: "/api",
      options: {
        target: "http://localhost:8080"
      }
    }
  }
});

config.resolve.extensions = ['', '.js', '.jsx'];
config.resolve.root = [path.resolve(__dirname, 'src')];
config.sassLoader = { includePaths: [path.resolve(__dirname, 'src', 'theme')] };

switch(process.env.npm_lifecycle_event) {
  case 'build': {
    config.devtool = 'cheap-module-source-map';
  }

  default: {
    config.devtool = 'source-map';
  }
}

module.exports = config;
