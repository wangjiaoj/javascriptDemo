const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
process.env.NODE_ENV = 'production';

const devConfig = require('./webpack.config.base.js');
const devMode = process.env.NODE_ENV !== 'production';

const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
const until = require("./until");
config.entry = until.getEntry(entryDir);

devConfig.plugins.push(
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
    })
);

module.exports = devConfig;