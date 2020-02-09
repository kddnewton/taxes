import path from "path";

export default {
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "awesome-typescript-loader" }
    ]
  }
};
