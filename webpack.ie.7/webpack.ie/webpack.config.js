const webpack = require('webpack');
module.exports = {
    entry: './src/app.js',
    output: {
        path: './js',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                enforce: 'post', // post-loader处理
                loader: 'es3ify-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
        })
    ]
};
