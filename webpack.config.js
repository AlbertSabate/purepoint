const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'

  const config = {
    entry: {
      app: path.join(__dirname, 'src/app.js'),
      vendors: [],
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'assets/js/[name]-[hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: !isProduction ? 'source-map' : false,
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|public)/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        }, {
          test: /\.(scss|sass)$/i,
          loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: !isProduction,
                },
              }, {
                loader: 'sass-loader',
                options: {
                  sourceMap: !isProduction,
                },
              },
            ],
          }),
        }, {
          test: /\.(jpeg|jpg|png|gif|svg)$/i,
          loader: 'file-loader?hash=sha512&digest=hex&publicPath=/&name=assets/img/[hash].[ext]',
        },
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          loader: 'file-loader?hash=sha512&digest=hex&publicPath=/&name=assets/fonts/[hash].[ext]',
        }, {
          test: /\.(json)$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([
        'public',
      ]),
      new HtmlWebpackPlugin({
        template: './src/app.html',
        path: path.join(__dirname, 'public'),
        filename: 'index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin({
        filename: 'assets/css/[hash].css',
        allChunks: true,
      }),
      new CopyWebpackPlugin([
        { context: './src/assets/files', from: '*', to: 'assets/files' },
        { context: './src/assets/favicons', from: 'favicon.ico' },
        { context: './src/assets/favicons', from: '*', to: 'assets/favicons' },
      ], {
        copyUnmodified: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      new webpack.ProvidePlugin({}),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'assets/js/[name]-[hash].js',
      }),
    ],
  }

  if (isProduction) {
    config.plugins.push(new UglifyJSPlugin())
  }

  return config
}
