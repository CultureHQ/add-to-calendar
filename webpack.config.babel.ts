import path from "path";

export default {
  output: {
    path: path.join(__dirname, "docs"),
    filename: "index.js"
  },
  entry: path.join(__dirname, "docs", "app.tsx"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/,
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs")
  }
};
