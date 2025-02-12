const { app, node, refresh } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Events on Refresh", () => {
  afterEach(clearApp);

  describe("Add (click) to a Button Element", () => {
    test("Should add a click event to a Button", () => {
      // ** Arrange
      const rootElement = document.body;
      const testRun = jest.fn();
      const rootScope = { testRun };
      const content = node("button", { "(click)": "testRun" });

      // ** Act
      const { scope } = app(rootElement, rootScope, content);
      refresh(scope);
      const button = document.body.lastChild;
      button.dispatchEvent(new Event("click"));

      // ** Assert
      expect(testRun).toHaveBeenCalled();
    });
  });

  describe("Add (keyup) to an Input Element", () => {
    test("Should add a keyup event to an Input", () => {
      // ** Arrange
      const rootElement = document.body;
      const testRun = jest.fn();
      const rootScope = { testRun };
      const content = node("input", { "(keyup)": "testRun" });

      // ** Act
      const { scope } = app(rootElement, rootScope, content);
      refresh(scope);
      const button = document.body.lastChild;
      button.dispatchEvent(new Event("keyup"));

      // ** Assert
      expect(testRun).toHaveBeenCalled();
    });
  });
});
