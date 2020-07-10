process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require("./webpack.config.js");
module.exports = merge(baseWebpackConfig, {
    entry: entryConfig.reduce((acc, cur) => {
        cur.entry['babel-polyfill'] = 'babel-polyfill'
        acc[cur.name] = [cur.entry].concat(hotMiddlewareScript);
        return acc;
    }, {}),
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        compress: true,
        hot: true, // 开启配置
        port: 9000
    };
    plugins: [
        // new webpack.DefinePlugin({
        //     __DEVELOPMENT__: JSON.stringify(true),
        //     'process.env': {
        //         NODE_ENV: '"development"'
        //     },
        //     API_PATH: '"https://172.19.80.83:7443/new_jgbcrm_dev/ifindcrm"',
        //     // API_PATH: '"/new_jgbcrm_dev/ifindcrm"',
        //     PUBLIC_PATH: '"/"',
        //     VERSON: '"V1"',
        //     AMAP_KEY: JSON.stringify(AMAP_KEY)
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ].concat(entryConfig.map(item => new HtmlWebpackPlugin({
        template: item.template,
        filename: item.name + '.html',
        chunks: [item.name],
        inject: 'body',
        windowCtxParam: '',
        windowSaleUrlParam: 'https://testm.10jqka.com.cn/devshouji/app/20191025/ykr_ROBOT-7938_vanish_20191014/yukangrong_ykr_ROBOT-7938_vanish_20191014_1571970085362/?place=shoujichaogu',
        AMAP_KEY
    })))
})