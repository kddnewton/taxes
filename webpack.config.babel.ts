import path from "path";

export default {
  output: {
    path: path.join(__dirname, "docs"),
    filename: "main.js"
  },
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "awesome-typescript-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs")
  }
};
