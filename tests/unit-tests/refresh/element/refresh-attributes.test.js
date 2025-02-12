const { app, node, refresh } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Refresh elements", () => {
  afterEach(clearApp);

  describe("Text change", () => {
    test("Should update the text content", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue1 = "Apple";
      const testValue2 = "Papaya";
      const testData = { test: testValue1 };
      const content = node("div", null, "test value {test}");

      // ** Act
      const { scope, rootScope } = app(rootElement, testData, content);
      rootScope.test = testValue2;
      refresh(scope);

      // ** Assert
      const { lastChild: div } = rootElement;
      expect(div.textContent).toBe(`test value ${testValue2}`);
    });
  });

  describe("Attribute change", () => {
    test("Should update the text content", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue1 = "Apple";
      const testValue2 = "Papaya";
      const testData = { test: testValue1 };
      const content = node("div", { class: "test {test}" });

      // ** Act
      const { scope, rootScope } = app(rootElement, testData, content);
      rootScope.test = testValue2;
      refresh(scope);

      // ** Assert
      const { lastChild: div } = rootElement;
      expect(div.classList.contains(testValue2)).toBe(true);
    });
  });
});
