const { app } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("deBracer", () => {
  afterEach(clearApp);

  // ** Arrange
  const rootElement = document.body;
  const value1 = "Something to consider";
  const value2 = "thinking about";

  describe("Content is just text", () => {
    test("Should render string with scope values", () => {
      // ** Arrange
      const rootScope = { value1, value2 };
      const content = "{value1} and then I am {value2}";

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      expect(rootElement.lastChild.textContent).toBe(
        `${value1} and then I am ${value2}`
      );
    });
  });

  describe("Add a skip character", () => {
    test("Should ignore skipped braces", () => {
      // ** Arrange
      const rootScope = { value1 };
      const content = "\\{value1}";

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      expect(rootElement.lastChild.textContent).toBe(`{value1}`);
    });
  });
});
