// Webpack uses this to work with directories
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: "./src/javascript/index.js",

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.hbs$/, loader: "handlebars-loader" },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // plugins: ["@babel/plugin-proposal-object-rest-spread"],
            plugins: ["@babel/plugin-transform-async-to-generator"],
          },
        },
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader",
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        // Now we apply rule for images
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images",
              // name: "[path][name].[ext]",
              publicPath: "../images/",
            },
          },

          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {},
      },
    }),
    new HtmlWebpackPlugin({
      title: "My awesome service",
      template: "./src/index.hbs",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css",
    }),
  ],
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
};
