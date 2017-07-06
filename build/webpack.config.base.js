const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

const package = require('../package.json');

// 入口配置文件
const entries = require('./entries.config.js');

// 无需编译文件存放目录
const STATIC_PATH = path.join(__dirname, '../', 'src/static');
// 目标输出
const DIST_PATH = `dist/${process.env.NODE_ENV}`;

// 页面生成插件
const HtmlWebpackPluginOptions = {
    inject: true,
    hash: true, // 开启追加哈希的行为
    minify: {
        removeComments: false,
        collapseWhitespace: false
    }
};

// 插件列表
const plugins = [
    // 删除生成的文件
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin([DIST_PATH], {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false,
        exclude: [],
    }),
    // 文件头部说明
    new webpack.BannerPlugin(`Powered by FE @knowbox version ${package.version}`),
    // 共享代码
    new webpack.optimize.CommonsChunkPlugin({
        name: 'polyfill',
        filename: 'js/polyfill.js',
        chunks: ['babel-polyfill']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor.js',
        chunks: ['vue', 'vuex', 'vue-router', 'in-view', 'isomorphic-fetch', 'axios']
    }),
    // 分离CSS文件
    new ExtractTextPlugin('css/[name].style.css', {
        disable: false,
        allChunks: true
    }),
    // 移动静态文件
    new TransferWebpackPlugin([{
        from: STATIC_PATH
    }]),
];

// 入口点对象生成
const entryConfig = entries.reduce((config, item) => {
    config[item.name] = item.entry;

    plugins.push(new HtmlWebpackPlugin(Object.assign({}, HtmlWebpackPluginOptions, {
        filename: `${item.name}.html`,
        template: item.template,
        favicon: './src/resources/favicon.png',
        chunks: ['polyfill', 'vendor', item.name],
        chunksSortMode: 'auto' 
    })));

    return config;
}, {});

console.info('Entries:');
Object.keys(entryConfig).forEach(key  => console.info(key + '->' + entryConfig[key]));

// less or sass variable configuration
const cssOptions = JSON.stringify({
    modifyVars: {
        'theme-color': 'red'
    }
});

module.exports = {
    entry: entryConfig,
    output: {
        path: path.join(__dirname, '../', DIST_PATH),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                // use vue-loader for *.vue files
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                // use babel-loader for *.js or *.jsx files
                test: /\.js[x]?$/,
                loader: 'babel',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            },
            {
                // use less-loader for *.less files
                test: /\.less/i,
                loader: ExtractTextPlugin.extract(`css-loader!postcss-loader!less-loader?${cssOptions}`),
                exclude: /node_modules/
            },
            {
                // use sass-loader for *.scss files
                test: /\.scss/i,
                loader: ExtractTextPlugin.extract('css!sass'),
                exclude: /node_modules/
            },
            {
                // load json file
                test: /\.json$/,
                loader: 'json-loader'
            }, 
            {
                // load image file
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    // &publicPath=&outputPath=
                    'file?hash=sha512&digest=hex&limit=10240&name=img/[name].[ext]?[hash]&publicPath=../'
                ]
            },
            {
                // font file
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            }, {
                test: /\.ijmap(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }
        ]
    },
    vue: {
        // configure autoprefixer
        autoprefixer: {
            browsers: ['last 4 versions']
        },
        loaders: {
            // css: ?modules&camelCase&localIdentName=[name]__[local]__[hash:base64:5]
            css: ExtractTextPlugin.extract("css-loader"),
            // less
            less: ExtractTextPlugin.extract("css-loader!less-loader")
        }
    },
    postcss: function() {
        return [autoprefixer({browsers: ['last 4 versions']}), precss];
	},
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: plugins
};
