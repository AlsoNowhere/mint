const { app, node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Add an element to the document", () => {
  afterEach(clearApp);

  // ** Arrange
  const rootElement = document.body;

  describe("Add a Div", () => {
    test("Should add a new HTMLElement to the Document", () => {
      // ** Arrange
      const content = node("div");

      // ** Act
      app(rootElement, {}, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.nodeName).toBe("DIV");
      expect(rootElement.childNodes.length).toBe(1);
    });
  });

  describe("Add a Div with text content", () => {
    test("Should add the correct content to the new HTMLElement", () => {
      // ** Arrange
      const testValue = "test value";
      const content = node("div", null, testValue);

      // ** Act
      app(rootElement, {}, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.nodeName).toBe("DIV");
      expect(rootElement.childNodes.length).toBe(1);
      expect(lastChild.textContent).toBe(testValue);
    });
  });
});
