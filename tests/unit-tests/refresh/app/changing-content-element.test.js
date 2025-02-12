const { app, refresh, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Change the content of an element with refresh", () => {
  afterEach(clearApp);

  describe("Content is just text", () => {
    test("Should change the content", () => {
      // ** Arrange
      const testValue1 = "- test 1 -";
      const testValue2 = "- check 2 -";
      const rootElement = document.body;
      const testData = { testValue: testValue1 };
      const content = node("span", null, "{testValue}");

      // ** Act
      const { scope, rootScope } = app(rootElement, testData, content);

      // ** Assert
      expect(rootElement.lastChild.textContent).toBe(testValue1);

      // ** Act
      rootScope.testValue = testValue2;
      refresh(scope);

      // ** Assert
      expect(rootElement.lastChild.textContent).toBe(testValue2);
    });
  });
});
