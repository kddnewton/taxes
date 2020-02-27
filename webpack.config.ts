import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  plugins: [
    new MiniCssExtractPlugin()
  ],
  output: {
    path: path.join(__dirname, "docs"),
    filename: "main.js"
  },
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".css", ".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "awesome-typescript-loader" },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
        exclude: /\.module\.css$/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs")
  }
};
