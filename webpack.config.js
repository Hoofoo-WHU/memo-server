const path = require('path')
const webpackModeExternals = require('webpack-node-externals')
module.exports = {
  entry: path.resolve('src/server.ts'),
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
  }
}