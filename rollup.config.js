import typescript from "@rollup/plugin-typescript";

const removeDelimiters = () => {
  const resolveContent = (fileContent) => {
    // ** Define
    const targets = [];
    let alteredContent = "";

    // ** Get all indexes of where content should be removed.
    {
      let i = 0;
      let inside = null;
      while (i < fileContent.length) {
        if (fileContent.substring(i, i + 2) === "<@") {
          inside = i;
        }
        if (fileContent.substring(i, i + 2) === "@>") {
          if (inside !== null) {
            targets.push([inside, i + 2]);
          }
          inside = null;
        }
        i++;
      }
    }

    // ** Build the output while ignoring what is between the indexes.
    {
      let i = 0;
      targets.forEach(([a, b]) => {
        alteredContent += fileContent.substring(i, a);
        i = b;
      });
      alteredContent += fileContent.substring(i);
    }

    // ** Return consolidated content.
    return alteredContent;
  };

  return {
    name: "remove-delimiters",
    transform(fileContent, location) {
      let env = process.env.NODE_ENV;
      if (env === undefined) return fileContent;

      // ** Detect spaces around "production" when defined in package.json
      env = env.replace(/\s/g, "");

      if (env === "production") {
        if (fileContent.includes("<@") && fileContent.includes("@>")) {
          return resolveContent(fileContent, location);
        }
      }
      return fileContent;
    },
  };
};

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
  plugins: [removeDelimiters(), typescript()],
  watch: {
    exclude: "node_modules/**",
  },
};
