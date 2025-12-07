const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: {
    theme: './src/scss/featured-products.scss',
  },

  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].bundle.js',
    clean: false,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'featured-products.css',
    }),
  ],

  devtool: 'source-map',

  stats: 'minimal',
};
