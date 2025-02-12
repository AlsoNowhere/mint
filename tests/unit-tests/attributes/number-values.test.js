const { app, node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Attributes", () => {
  afterEach(clearApp);

  describe("Add an attribute that has a number value", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const content = node("div", { "[data-attr]": "value" });
      const testValue = 1;

      // ** Act
      app(document.body, { value: testValue }, content);

      // ** Assert
      const [div] = document.body.children;
      expect(div.attributes["data-attr"].nodeValue).toBe(testValue.toString());
    });
  });
});
