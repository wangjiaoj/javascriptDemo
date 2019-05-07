const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require("glob");

process.env.NODE_ENV = 'production';
const devConfig = require('./webpack.config.base.js');
const devMode = process.env.NODE_ENV !== 'production'

const cssFileName = devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css'; //'.[chunkhash]'
const htmlDir = './tpl/**/*.html'; //html文件所在文件夹地址->可以根据项目实际情况修改参数

function htmlPack(dir) {
    var outPreFix = "../../";
    var list = [];
    list.push(new CleanWebpackPlugin());

    //复制一份html文件到html文件夹中去，只是用来方便测试命令的，实际使用可以注释掉
    list.push(new CopyPlugin([
        { from: './tpl/*', to: path.resolve(__dirname, './html') }
    ]));

    list.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: cssFileName,
        chunkFilename: "[id].css"
    }));
    glob.sync(dir)
        .forEach(function(name) {
            let start = name.indexOf('./'),
                end = name.length;
            let rename = name.slice(start, end);
            console.log(`name:${name},rname:${outPreFix + name}`);
            list.push(new HtmlWebpackPlugin({
                template: name, //指定要打包的html路径和文件名
                filename: outPreFix + rename, //指定输出路径和文件名 
                showErrors: true, //webpack 编译出现错误
                minify: false
            }));
        });
    return list;
}


devConfig.plugins = htmlPack();

module.exports = devConfig;