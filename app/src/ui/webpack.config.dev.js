var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    target: 'electron',
    devtool: 'source-map',
    entry: {
        'index': './src/ui/index.js',
        // 'react': ['react', 'react-dom'],
        // 'third': ['react-router', 'react-redux', 'redux', 'isomorphic-fetch', 'object-assign', 'marked', 'moment', 'scroll-behavior', 'classnames'],
        // 'i18n': ['./shop/js/components/other/i18n']
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "dist/",
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // //提取公共的模块作为单独文件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['react', 'third', 'i18n'],
        //     minChunks: Infinity
        // }),
        // //生成独立的css文件
        new ExtractTextPlugin('[name].min.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel?presets[]=react,presets[]=es2015"
            },
            // {
            //     test: /\.html$/,
            //     loader: "file?name=[name].[ext]"
            // },
            // {
            //     test: /\.png$/,
            //     loader: "url-loader?limit=10000"
            // },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract('style', "css?sourceMap!autoprefixer!sass")
            // }
        ]
    },
    "babel": {
        //antd按需加载插件
        "plugins": [["antd", {"style": "css"}]]
    }
};