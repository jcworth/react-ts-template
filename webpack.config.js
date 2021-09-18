const { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'css',
                            minify: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new HotModuleReplacementPlugin(),
        new ProvidePlugin({
            React: 'react'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        publicPath: '/',
        open: true,
        compress: true,
        hot: true,
        port: 8080
    }
};
