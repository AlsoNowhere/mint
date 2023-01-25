import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/mint.ts",
  output: [
    {
      file: "./dist/mint.js",
      format: "esm",
    },
    {
      file: "./dist/mint-test.js",
      format: "cjs",
    },
    {
      file: "./dist/mint-experiment.js",
      format: "iife",
      name: "mint",
    },
  ],
  plugins: [typescript()],
  watch: {
    exclude: "node_modules/**",
  },
};
