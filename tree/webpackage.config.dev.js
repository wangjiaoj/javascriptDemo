const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = reuqire('./webpack.config.js');
config.plugins.push(new webpack.HotModuleReplacemebtPlugin());
config.devServer = {
    contentBase: path.resolve('/'),
    inline: true,
    hot: true,
    proxy: {
        '': ''
    }
}
module.exports = config;