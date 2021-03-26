const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.resolve(__dirname, 'lib', 'Editor');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: outputPath,
    filename: 'index.js',
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: true,
                declarationDir: outputPath,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['**/*'],
    }),
    new MiniCssExtractPlugin({
      filename: 'code-mirror.css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
};



