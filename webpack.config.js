const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Terser = require("terser-webpack-plugin")
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const path = require("path")

module.exports = (env, options) => {
    return {
        mode: options.mode,
        performance: {
            hints: false,
        },
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],
            },
        },
        devtool: options.mode === "development" ? "inline-source-map" : false,
        entry: {
            index: path.resolve(__dirname, "src", "js", "index.js"),
            app: path.resolve(__dirname, "src", "scss", "app.scss"),
        },
        output: {
            filename: "[name].build.js",
            path: path.resolve(__dirname, ""),
            assetModuleFilename: "assets/[base]"
        },
        optimization: {
            minimize: options.mode === "production",
            minimizer: [
                new CssMinimizerPlugin(),
                new Terser({
                    extractComments: false,
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.s?[ca]ss/i,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: 'resolve-url-loader',
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                postcssOptions: {
                                    plugins: [
                                        "postcss-preset-env",
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(glsl|vs|fs)$/,
                    loader: 'ts-shader-loader',
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp|pdf|ico)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new RemoveEmptyScriptsPlugin({
                extensions: ["css", "scss", "sass", "html"],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].build.css",
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, ''),
            },
            compress: false,
            port: 9000,
        },
    }
}
