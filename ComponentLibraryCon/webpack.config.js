const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path');

/****
 * 在webpack 4中，我们可以直接使用"mode"设置为"production"来启用UglifyJsPlugin。
 *  */
module.exports = {
    entry: {
        tool: './src/tool.js',
    },
    output: {
        //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
        path: path.resolve(__dirname, './js/'),
        // publicPath: '',
        filename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名
    },
    module: {
        rules: [{
                test: /\.js$/,
                enforce: 'post', // post-loader处理
                use: {
                    loader: 'es3ify-loader'
                }
            }, {
                test: /\.js$/,
                //include: [resolve('src')], // 限定范围 提升速度
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            /**
            ** 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，
            遇到“@import”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），
            最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
            loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。
            因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
            mini-css-extract-plugin 是把css分离出去的'style-loader'和 mini-css-extract-plugin 不可通用 自己选一个
             MiniCssExtractPlugin:This plugin should be used only on production builds without style-loader in the loaders chain, 
              especially if you want to have HMR in development.
            *  */

            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: './static/css/'
                    }
                }, 'css-loader']
            }, {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: './static/css/'
                    }
                }, 'css-loader', 'sass-loader']

            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    /**    
     * ES3中保留字问题
     * default、class、catch等属于保留字，通过对象直接调用obj.default在IE下会报错（缺少标识符），转换为保留字加引号的形式就可以解决。
     * 使用es3ify可以解决这个问题，在webpack中使用es3ify-loader进行前置编译即可：
     * 但是， 如果同时使用了webpack.optimize.UglifyJsPlugin压缩， 可能会把上面保留字的引号给去掉了。
     * 为了避免这种情况的发生， 需要加特殊配置compress.properties = false和output.quote_keys = true：
     *  */
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