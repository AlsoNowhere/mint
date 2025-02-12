const { app, refresh } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Mount a basic app then refresh", () => {
  afterEach(clearApp);

  describe("Content is just text", () => {
    test("Should update the content", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = {};
      const content = "test value 1";

      // ** Act
      const { scope } = app(rootElement, rootScope, content);

      refresh(scope);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(content);
      expect(rootElement.childNodes.length).toBe(1);
    });
  });

  describe("Content is text, in an Array", () => {
    test("Should update the content", () => {
      // ** Arrange
      const testValue = "test value array";
      const rootElement = document.body;
      const rootScope = {};
      const content = [testValue];

      // ** Act
      const { scope } = app(rootElement, rootScope, content);

      refresh(scope);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(testValue);
      expect(rootElement.childNodes.length).toBe(1);
    });
  });

  describe("Multiple content is text, in an Array", () => {
    test("Should update the content", () => {
      // ** Arrange
      const testValue = "test value array";
      const rootElement = document.body;
      const rootScope = {};
      const content = [testValue, testValue];

      // ** Act
      const { scope } = app(rootElement, rootScope, content);

      refresh(scope);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(testValue);
      expect(rootElement.childNodes.length).toBe(2);
    });
  });

  describe("Content has data to parse", () => {
    test("Should update the content", () => {
      // ** Arrange
      const testValue = "test value";
      const rootElement = document.body;
      const rootScope = { test: testValue };
      const content = "Test: {test}";

      // ** Act
      const { scope } = app(rootElement, rootScope, content);

      refresh(scope);

      // ** Assert
      const { lastChild } = rootElement;
      expect(lastChild.textContent).toBe(`Test: ${testValue}`);
    });
  });
});
