var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
        './src/search.js'
    ],
    output: {
        path: __dirname + '/dist', //distribution
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}