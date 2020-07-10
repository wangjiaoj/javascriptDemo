 process.env.NODE_ENV = 'production';

 var webpack = require('webpack');
 var path = require('path');
 var { merge } = require('webpack-merge');
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 var CleanWebpackPlugin = require('clean-webpack-plugin');
 var CopyWebpackPlugin = require('copy-webpack-plugin');
 var baseWebpackConfig = require("./webpack.config.js");


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
         minimizer: [
             //  new UglifyJsPlugin({
             //      cache: true,
             //      parallel: true,
             //      sourcMap: true
             //  }),
             new OptimizeCssAssetsPlugin({
                 assetNameRegExp: /\.optimize\.css$/g, // /\.css$/g,
                 cssProcessor: require('cssnano'),
                 cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                 canPrint: true
             })
         ],
     },
     plugins: [
         // 删除文件
         new CleanWebpackPlugin('build/**/*', {
             exclude: ['.svn']
         }),
         //  new CopyWebpackPlugin([{
         //      from: path.resolve(ROOT_PATH, 'external'),
         //      to: BUILD_PATH
         //  }]),
         //  new ExtractTextPlugin({
         //      filename: cssPath + '[name].[chunkhash:8].css'
         //  }),
         new MiniCssExtractPlugin({
             // Options similar to the same options in webpackOptions.output
             // both options are optional
             filename: "[name].css",
             chunkFilename: "[id].css"
         })

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