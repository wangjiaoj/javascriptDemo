const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/****
 * 在webpack 4中，我们可以直接使用"mode"设置为"production"来启用UglifyJsPlugin。
 *  */
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
        path: path.resolve(__dirname, './dist/'),
        //publicPath: "./",
        filename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], //自动解析确定的拓展名,使导入模块时不带拓展名
        alias: { // 创建import或require的别名
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
                test: /.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        transformAssetUrls: {
                            video: ['src', 'poster'],
                            source: 'src',
                            img: 'src',
                            image: ['xlink:href', 'href'],
                            use: ['xlink:href', 'href']
                        }
                    }
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
                use: [
                    //     {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         // you can specify a publicPath here
                    //         // by default it use publicPath in webpackOptions.output
                    //         publicPath: './src'
                    //     }
                    // },
                    'css-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [
                    //     {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         // you can specify a publicPath here
                    //         // by default it use publicPath in webpackOptions.output
                    //         publicPath: './src'
                    //     }
                    // }, 
                    'vue-style-loader', 'css-loader', 'sass-loader'
                ]
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
        // 请确保引入这个插件！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
        new VueLoaderPlugin()
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ],

    optimization: {
        minimizer: []
    }
};