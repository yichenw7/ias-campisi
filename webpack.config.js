const ENV = process.env.NODE_ENV;

if (ENV === 'production') {
  module.exports = require('./webpack/webpack.config.prd');
} else {
  module.exports = require('./webpack/webpack.config.dev');
}
