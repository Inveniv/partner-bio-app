module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "nativewind/babel",
    "react-native-paper/babel",
    "module:react-native-dotenv",
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        root: ["./src"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
