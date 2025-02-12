const { app } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Mount a basic app", () => {
  afterEach(clearApp);

  describe("Content is just text", () => {
    test("Should add the content to the document", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = {};
      const content = "test value 1";

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(content);
      expect(rootElement.childNodes.length).toBe(1);
    });
  });

  describe("Content is text, in an Array", () => {
    test("Should add the content to the document", () => {
      // ** Arrange
      const testValue = "test value array";
      const rootElement = document.body;
      const rootScope = {};
      const content = [testValue];

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(testValue);
      expect(rootElement.childNodes.length).toBe(1);
    });
  });

  describe("Multiple content is text, in an Array", () => {
    test("Should add the content to the document", () => {
      // ** Arrange
      const testValue = "test value array";
      const rootElement = document.body;
      const rootScope = {};
      const content = [testValue, testValue];

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(testValue);
      expect(rootElement.childNodes.length).toBe(2);
    });
  });

  describe("Content has data to parse", () => {
    test("Should add the parsed content to the document", () => {
      // ** Arrange
      const testValue = "test value";
      const rootElement = document.body;
      const rootScope = { test: testValue };
      const content = "Test: {test}";

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(`Test: ${testValue}`);
    });
  });
});
