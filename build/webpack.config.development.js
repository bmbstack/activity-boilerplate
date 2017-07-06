/**
  * development env
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const os = require('os');

const WebpackShellPlugin = require('webpack-shell-plugin');

const baseConfig = require('./webpack.config.base');

const PORT = 8091;
const isWindows = os.platform() === 'win32';

const result = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                IS_WINDOWS: `${isWindows}`
            }
        }),
        // 自动打开浏览器
        new WebpackShellPlugin({
            onBuildStart: ['echo 代码狗, 就知道你还没下班😂   ---- 来自编译器的嘲讽'],
            onBuildEnd: [`${isWindows?'start':'open'} http://localhost:${PORT}/example.html`]
        })
    ],
    debug: true,
    devtool: 'source-map',
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        assets: true,
    },
    progress: true,
    keepalive: true,
    externals: {

    },
    watchOptions: {
        aggregateTimeout: 500, //ms, default is 300
        poll: true
    },
    devServer: {
        port: PORT,
        /* 放开注释, 配置映射关系
        // see more http://webpack.github.io/docs/webpack-dev-server.html#proxy
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
        proxy: {
            '/html5/*': {
                target: 'http://192.168.1.49:9008',
                secure: false,
                changeOrigin: true
            },
            '/list': {
                target: 'http://ssapinew.knowbox.cn',
                secure: false,
                changeOrigin: true
            }
        } 
        //*/
    }
});

module.exports = result;
