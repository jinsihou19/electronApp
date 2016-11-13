var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    target: 'electron',
    devtool: 'source-map',
    entry: {
        'index': './src/ui/index.tsx',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
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
        //     name: ['lib'],
        //     minChunks: Infinity
        // }),
        //生成独立的css文件
        new ExtractTextPlugin('[name].min.css')
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "babel?presets[]=react,presets[]=es2015!ts-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel?presets[]=react,presets[]=es2015"
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', "css?sourceMap!autoprefixer!sass")
            },
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    "babel": {
        //antd按需加载插件
        "plugins": [["antd", {"style": "css"}]]
    }
};