const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    // Use root so scripts load correctly on direct/refresh of deep routes (e.g. /route-advanced/nested)
    publicPath: "/",
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "LiveDemosHost",
      filename: "remoteEntry.js",
      remotes: {
        DemoCatalogRemote: "DemoCatalog@http://localhost:3001/remoteEntry.js",
        DemoViewerRemote: "DemoViewer@http://localhost:3002/remoteEntry.js",
        RouteBasicsRemote: "RouteBasics@http://localhost:3003/remoteEntry.js",
        RouteAdvancedRemote: "RouteAdvanced@http://localhost:3004/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
