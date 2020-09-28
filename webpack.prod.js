const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css",
    }),
    // new CompressionPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  mode: "production",
});
