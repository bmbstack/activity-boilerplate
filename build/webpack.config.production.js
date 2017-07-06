/**
  * Wait for finish project 
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const result = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    ],
    vue: {
        // css
        css: ExtractTextPlugin.extract("css-loader?modules&minimize&camelCase&localIdentName=[hash]"),
        // less
        less: ExtractTextPlugin.extract("css-loader!less-loader")
    },
    debug: false,
    devtool: false,
});

module.exports = result;
