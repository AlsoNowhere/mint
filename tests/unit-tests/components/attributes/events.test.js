const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("events", () => {
  afterEach(clearApp);

  describe("Add event to d", () => {
    test("Should add a click event to a Button", () => {
      // ** Arrange
      const rootElement = document.body;
      const testRun = jest.fn();
      const Basic = component("button", null, { "(click)": "testRun" });
      const content = node(Basic, { testRun });

      // ** Act
      app(rootElement, {}, content);
      const [button] = document.body.children;
      button.dispatchEvent(new Event("click"));

      // ** Assert
      expect(testRun).toHaveBeenCalled();
    });
  });
});
