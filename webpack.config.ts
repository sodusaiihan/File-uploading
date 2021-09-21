import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isProd = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: isProd ? "production" : "development",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  devtool: isProd ? false : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};

export default config;
