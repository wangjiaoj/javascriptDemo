/****
 * 在webpack 4中，我们可以直接使用"mode"设置为"production"来启用UglifyJsPlugin。
 *  */
/**    
 * ES3中保留字问题
 * default、class、catch等属于保留字，通过对象直接调用obj.default在IE下会报错（缺少标识符），转换为保留字加引号的形式就可以解决。
 * 使用es3ify可以解决这个问题，在webpack中使用es3ify-loader进行前置编译即可：
 * 但是， 如果同时使用了webpack.optimize.UglifyJsPlugin压缩， 可能会把上面保留字的引号给去掉了。
 * 为了避免这种情况的发生， 需要加特殊配置compress.properties = false和output.quote_keys = true：
 *  */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production'
const dirPath = '../dist/';
const publicPath = '';
const cssPublicPath = './';
const cssFileName = devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css'; //'.[chunkhash]'
const jsFileName = devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js'; //'.[chunkhash]'
const imgFileName = devMode ? 'image/[name].[ext]' : 'image/[name].[hash:7].[ext]'; //'.[hash:7]'


module.exports = {
    mode: devMode ? "development" : "production",
    entry: {
        tool: './src/tool.js',
        vendor: ['es5-shim', 'es5-shim/es5-sham', 'console-polyfill']
    },
    output: {
        //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
        path: path.resolve(__dirname, dirPath),
        publicPath: '',
        filename: jsFileName
    },
    module: {
        rules: [{
                test: /\.js$/,
                //include: [resolve('src')], // 限定范围 提升速度
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.js$/,
                enforce: 'post', // post-loader处理
                use: {
                    loader: 'es3ify-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: cssPublicPath
                    }
                }, 'css-loader']
            }, {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: cssPublicPath
                    }
                }, 'css-loader', 'sass-loader']

            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: imgFileName
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: cssFileName,
            chunkFilename: "[id].css"
        })
    ],
    optimization: {
        minimizer: [

            new UglifyJsPlugin({
                // mangle: {
                //     screw_ie8: false
                // },
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        properties: false //(default true) rewrite property access using the dot notation, for example foo["bar"]→ foo.bar
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: {
                        quote_keys: true //quote_keys (default false) -- pass true to quote all keys in literal objects
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_fnames: false,
                }
            })

        ]
    }
};