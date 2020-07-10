 process.env.NODE_ENV = 'production';

 var webpack = require('webpack');
 var path = require('path');
 var merge = require('webpack-merge');
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 // var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 var baseWebpackConfig = require("./webpack.config.js");
 //var CleanWebpackPlugin = require('clean-webpack-plugin');
 //var CopyWebpackPlugin = require('copy-webpack-plugin');

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
     plugins: [
         new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: '"production"'
             },
             VERSON: '"V1"',
             API_PATH: '""', // ftl
             // API_PATH: '"/new_jgbcrm_dev/ifindcrm"',     // html
             PUBLIC_PATH: '"/"',
             __DEVELOPMENT__: JSON.stringify(false),
             AMAP_KEY: JSON.stringify(AMAP_KEY)
         }),
         // 删除文件
         //  new CleanWebpackPlugin('build/**/*', {
         //      exclude: ['.svn']
         //  }),
         // new CopyWebpackPlugin([{
         //   from: path.resolve(ROOT_PATH, 'external'),
         //   to: BUILD_PATH
         // }]),

         // 提取公共js文件
         //  new webpack.optimize.CommonsChunkPlugin({
         //      name: 'commons',
         //      chunks: entryConfig.map(item => item.name),
         //      filename: jsPath + 'commons.[hash:8].js',
         //      minChunks: entryConfig.length
         //  }),
         new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: '"production"'
             },
             PUBLIC_PATH: '"/"'
         }),
         new ExtractTextPlugin({
             filename: cssPath + '[name].[chunkhash:8].css'
         }),
         new OptimizeCssAssetsPlugin({
             assetNameRegExp: /\.css$/g,
             cssProcessor: require('cssnano'),
             cssProcessorOptions: { discardComments: { removeAll: true }, safe: true },
             canPrint: false
         }),
         // new BundleAnalyzerPlugin({
         //   analyzerPort: 9999
         // })
     ].concat(entryConfig.map(item => new HtmlWebpackPlugin({
         template: item.template,
         filename: item.name + '.html',
         chunks: ['commons', item.name],
         inject: 'body',
         windowCtxParam: '${request.contextPath}',
         windowSaleUrlParam: '${saleUrl!}',
         AMAP_KEY
     })))
 })