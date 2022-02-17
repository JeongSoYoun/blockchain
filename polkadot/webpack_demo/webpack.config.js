
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve("./dist"),
        filename: "main.js",
    },

    devServer: {
        host: '127.0.0.1',
        port: 8080,
        open: {
            app: {
                name: 'Google Chrome'
            }
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
}

