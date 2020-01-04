const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require("./webpack.config.js");
const config = require("../config/index.js");

process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const path = require('path');
devConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        fileName: 'index.html',
        template: 'index.html',
        inject: true
    })
);
devConfig.devtool = 'source-map';
devConfig.devServer = {
    historyApiFallback: {
        rewrites: [{
            from: /.*/,
            to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }]
    },
    contentBase: false,
    compress: true,
    hot: true, // 开启配置
    port: 3333
};
module.exports = devConfig;