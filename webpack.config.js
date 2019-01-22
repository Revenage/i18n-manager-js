const env = process.env.NODE_ENV || 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'assets/js/[name].[chunkhash].js',
        filename: 'static/js/[name].js',
        publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: [path.resolve(__dirname, 'dist')],
        historyApiFallback: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        host: '0.0.0.0',
        useLocalIp: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
                use: 'file-loader?name=assets/fonts/[name]-[hash].[ext]',
            },
            {
                test: /\.(png|gif|jpg|ico)$/,
                use:
                    'url-loader?limit=20480&name=assets/img/[name]-[hash].[ext]',
                include: path.join(__dirname, 'static'),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'assets'),
                to: 'static',
            },
        ]),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages'),
            components: path.resolve(__dirname, 'src/components'),
            api: path.resolve(__dirname, 'src/api'),
            store: path.resolve(__dirname, 'src/store'),
            config: path.resolve(__dirname, 'src/config'),
            constants: path.resolve(__dirname, 'src/constants'),
        },
        extensions: ['.js', '.jsx'],
    },
};
