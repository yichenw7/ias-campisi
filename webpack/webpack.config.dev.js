const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config');

const BUILD_ENV = process.env.BUILD_ENV;
const config = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
  ],
  devServer: {
    contentBase: base.output.path,
    port: 3000,
    index: `index.${BUILD_ENV}.html`,
    hot: true,
    https: false,
    historyApiFallback: {
      index: 'index.dev.html',
    },
    proxy: {
      '/api': {
        // target: `http://ssefi-nodeserver.${BUILD_ENV}.sumscope.com:5100`,
        target: 'http://192.168.1.212/',
        pathRewrite: {
          '^/api/': '/api/campisi/'
        }
      },
      '/web-library': {
        target: `http://service-ssefi.${BUILD_ENV}.sumscope.com:7998`
      },
    },
  },
};

module.exports = merge(base, config);
