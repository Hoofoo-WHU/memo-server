const path = require('path')
const webpackModeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: path.resolve('src/server.ts'),
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    },
    extensions: ['.ts']
  },
  externals: [
    webpackModeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve('dist'), { root: path.resolve('') })
  ]
}