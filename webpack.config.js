var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        publicPath: '',
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist')
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?{tsconfig: "tsconfig.json"}'
                ]
            },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    },

    resolve: {
        extensions: [ '.ts', '.js', '.json', '.html' ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
          //account for path separators in Windows
          path.resolve(__dirname, './src')
        ),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new webpack.DefinePlugin({
          app: {
            environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
          }
        })
      ]

};