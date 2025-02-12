const { app, refresh, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component Lifecycle - oneach", () => {
  afterEach(clearApp);

  describe("Component first added", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const oneach = jest.fn();
      const TestComponent = component("div", function () {
        this.oneach = oneach;
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(oneach).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component refreshed", () => {
    test("Should not run on refresh when nothing changes", () => {
      // ** Arrange
      const oneach = jest.fn();
      const TestComponent = component("div", function () {
        this.oneach = oneach;
      });

      // ** Act
      const { scope } = app(document.body, {}, node(TestComponent));
      refresh(scope);

      // ** Assert
      expect(oneach).toHaveBeenCalledTimes(2);
    });
  });
});
