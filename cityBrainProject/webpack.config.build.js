 process.env.NODE_ENV = 'production';

 var webpack = require('webpack');
 var path = require('path');
 var { merge } = require('webpack-merge');
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 var { CleanWebpackPlugin } = require('clean-webpack-plugin');
 var CopyWebpackPlugin = require('copy-webpack-plugin');
 var baseWebpackConfig = require("./webpack.config.js");
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

 var { ROOT_PATH, BUILD_PATH, entryConfig, jsPath, cssPath, AMAP_KEY } = require('./config/buildConfig.js');

 module.exports = merge(baseWebpackConfig, {
     entry: entryConfig.reduce((acc, cur) => {
         cur.entry['babel-polyfill'] = 'babel-polyfill'
         acc[cur.name] = cur.entry;
         return acc;
     }, {}),
     output: {
         path: BUILD_PATH,
         publicPath: '/', // html
         filename: jsPath + '[name].[chunkhash:8].js'
     },
     optimization: {
         //usedExports: true,//tree shaking
         //minimize:true,//使用默认的配置
         minimizer: [
             new UglifyJsPlugin({
                 cache: true,
                 parallel: true,
                 uglifyOptions: {
                     warnings: false,
                     parse: {},
                     compress: {},
                     mangle: true, // Note `mangle.properties` is `false` by default.
                     output: null,
                     toplevel: false,
                     nameCache: null,
                     ie8: false,
                     keep_fnames: false,
                 },
             }),
             new OptimizeCssAssetsPlugin({
                 assetNameRegExp: /\.optimize\.css$/g, // /\.css$/g,
                 cssProcessor: require('cssnano'),
                 cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                 canPrint: true
             })
         ],
         splitChunks: {
             chunks: 'async',
             minSize: 30000,
             maxSize: 0,
             minChunks: 2, // 最少需要几个模块公用 
             maxAsyncRequests: 6, // 按需加载时并行请求的最大数量
             maxInitialRequests: 4, // //最大的初始化加载次数，默认为4；
             automaticNameDelimiter: '-',

             name: true, //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
             cacheGroups: {
                 vendors: {
                     test: /[\\/]node_modules[\\/]/,
                     priority: -10
                 },
                 app: {
                     name: 'app',
                     minChunks: 3,
                     priority: -20,
                     reuseExistingChunk: true // 复用之前打包的模块
                 }
             }
         },
         runtimeChunk: {
             name: `manifest`
         }
     },
     plugins: [
         // 删除文件
         new CleanWebpackPlugin({
             cleanOnceBeforeBuildPatterns: ['build/**/*'],
         }),
         new CopyWebpackPlugin(
             [{ from: path.resolve(ROOT_PATH, 'external'), to: BUILD_PATH }],
         ),
         //  new ExtractTextPlugin({
         //      filename: cssPath + '[name].[chunkhash:8].css'
         //  }),
         new MiniCssExtractPlugin({
             // Options similar to the same options in webpackOptions.output
             // both options are optional
             filename: "[name].css",
             chunkFilename: "[id].css"
         }),
         new BundleAnalyzerPlugin()
     ].concat(entryConfig.map(item => new HtmlWebpackPlugin({
         template: item.template,
         filename: item.name + '.html',
         chunks: ['commons', item.name],
         inject: 'body',
         windowCtxParam: '${request.contextPath}',
         windowSaleUrlParam: '${saleUrl!}',
         AMAP_KEY
     })))
 });