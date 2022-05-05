// @ts-check

const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    compress: true,
    port: 8090,
    host: '0.0.0.0',
    // publicPath: '/assets/',
    historyApiFallback: true,
  },
  // plugins: [
  //   new MiniCssExtractPlugin(),
  // ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|png|jpg|svg|gif|ico)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(sass|less|css)$/,
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        }],
      },
    ],
  },
};
