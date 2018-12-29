/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlStaticBeforePlugin = require('html-static-before-plugin');
const HappyPack = require('happypack');
const HappyThreadPool = HappyPack.ThreadPool({ size: require('os').cpus().length });
const antTheme = require('ss-web-start').antTheme;
const baseConfig = require('./config');

const resolve = path.resolve;

const node_modules = resolve(__dirname, '../node_modules');
const src = resolve(__dirname, '../src');
const asset = 'static/';
const outputPath = resolve(__dirname, '../dist');
const ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.BUILD_ENV || 'prd';

const config = {
  entry: resolve(src, 'index.js'),
  output: {
    path: outputPath,
    filename: `${asset}js/[name].[hash:8].js`,
    publicPath: '/',
    globalObject: 'self'
  },
  resolve: {
    alias: {
      'react': resolve(node_modules, 'react'),
      'react-dom': resolve(node_modules, 'react-dom'),
      'react-router-dom': resolve(node_modules, 'react-router-dom'),
      'react-redux': resolve(node_modules, 'react-redux'),
      'history': resolve(node_modules, 'history'),
      'redux': resolve(node_modules, 'redux'),
      '@containers': resolve(src, 'containers'),
      '@components': resolve(src, 'components'),
      '@actions': resolve(src, 'actions'),
      '@caches': resolve(src, 'caches'),
      '@constants': resolve(src, 'constants'),
      '@models': resolve(src, 'models'),
      '@themes': resolve(src, 'themes'),
      '@routes': resolve(src, 'routes'),
      '@utils': resolve(src, 'utils'),
    },
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'echarts': 'echarts',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=js',
    }, {
      test: /worker\.js$/,
      use: { loader: 'worker-loader', options: { name: `${asset}js/fetch-worker.[hash:8].js` } },
    }, {
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', 'postcss-loader',
          {
            loader: 'less-loader',
            options: { modifyVars: antTheme }
          }
        ]
      })
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: `url-loader?limit=100&name=${asset}images/[name].[hash:8].[ext]`
    }, {
      test: /\.(ttf|svg|eot|woff)$/,
      use: `url-loader?limit=100&name=${asset}fonts/[name].[hash:8].[ext]`,
    }]
  },
  plugins: [
    new CleanPlugin(['dist/*', 'build/*.*'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
    }),
    new CaseSensitivePathsPlugin(),
    new ExtractTextPlugin({ filename: `${asset}css/[name].[hash:8].css`, allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.RUN_ENV': JSON.stringify(BUILD_ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: ENV === 'production',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/
    ),
    new HappyPack({
      id: 'js',
      threadPool: HappyThreadPool,
      loaders: ['babel-loader'],
      verboseWhenProfiling: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'index.html'),
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: ENV !== 'production',
      },
    }),
    new HtmlStaticBeforePlugin({ ...baseConfig['dev'], filename: 'index.dev.html', writeToDisk: true }),
    new HtmlStaticBeforePlugin({ ...baseConfig['qa'], filename: 'index.qa.html', writeToDisk: true }),
    new HtmlStaticBeforePlugin({ ...baseConfig['prd'], filename: 'index.prd.html', writeToDisk: true }),
    new HtmlStaticBeforePlugin({ ...baseConfig[BUILD_ENV] }),
    new CopyWebpackPlugin([{
      from: path.resolve(node_modules, 'ss-web-start/theme/'),
      to: path.resolve(outputPath, `${asset}fonts`),
      ignore: ['*.less', '*.js'],
    }, {
      from: path.resolve(__dirname, 'favicon.ico'),
      to: path.resolve(outputPath, asset),
    }]),
  ]
};
config.mode = ENV;
config.optimization = {
  splitChunks: {
    cacheGroups: {
      // 处理入口chunk
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        name: 'vendors',
      },
      // 处理异步chunk
      'async-vendors': {
        test: /[\\/]node_modules[\\/]/,
        minChunks: 2,
        chunks: 'async',
        name: 'async-vendors'
      }
    }
  }
};

module.exports = config;
