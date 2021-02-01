const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path');

const config = {
    entry: './demo/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/
        }, {
            test: /\.(wasm|png)$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: './demo/index.html'
        })
    ],
    devServer: {
        contentBase: './demo'
    }
};

module.exports = config;