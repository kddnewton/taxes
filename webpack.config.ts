import path from "path";

export default {
  output: {
    path: path.join(__dirname, "docs")
  },
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".css", ".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
          "style-loader",
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
