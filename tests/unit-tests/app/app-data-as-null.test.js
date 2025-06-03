const { app, node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Mount an app with data as null", () => {
  afterEach(clearApp);

  test("Should error", () => {
    // ** Arrange
    const runTest = () => {
      app(document.body, null, node("div", null, ""));
    };

    // ** Act

    // ** Assert
    expect(runTest).toThrow(
      "app -- rootScope -- Cannot pass null as root scope. Root scope is defined against generic T as can't autofill from null."
    );
  });
});
