const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './demo/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.wasm$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html'
        })
    ],
    devServer: {
        contentBase: './demo'
    }
};

module.exports = config;