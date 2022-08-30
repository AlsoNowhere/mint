
export default {
    input: "./src/main.js",
    output: [
        {
            file: "./dist/mint.js",
            format: "esm"
        },
        {
            file: "./dist/mint-cjs.js",
            format: "cjs"
        }
    ],
    watch: {
        exclude: "node_modules/**"
    }
}
