const merge = require('webpack-merge');
const base = require('./webpack.config');

const config = {
  optimization: {
    minimize: true,
    noEmitOnErrors: true,
    concatenateModules: true,
  },
  plugins: [
    // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
  ]
};

module.exports = merge(base, config);
