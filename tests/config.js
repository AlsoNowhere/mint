const config = {
  testEnvironment: "jsdom",
  verbose: true,
  testPathIgnorePatterns: [
    "/node_modules/",

    "/tests/attributes",
    "/tests/basic",
    // "/tests/common",
    "/tests/components",
    "/tests/mFor",
    "/tests/mIf",
    "/tests/other",
    "/tests/stores",

    "/tests/mFor/double-keys.test.js",
    "/tests/mFor/moving-object.test.js",
  ],
};

module.exports = config;
