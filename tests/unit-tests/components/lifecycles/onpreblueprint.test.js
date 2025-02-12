const { app, refresh, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component Lifecycle - onpreblueprint", () => {
  let consoleWarnMock;

  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  afterEach(clearApp);

  describe("Component first added", () => {
    test("Should run before blueprints are generated", () => {
      // ** Arrange
      const onpreblueprint = jest.fn();
      const TestComponent = component("div", function () {
        this.onpreblueprint = onpreblueprint;
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(onpreblueprint).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component refreshed", () => {
    test("Should not run on refresh when nothing changes", () => {
      // ** Arrange
      const onpreblueprint = jest.fn();
      const TestComponent = component("div", function () {
        this.onpreblueprint = onpreblueprint;
      });

      // ** Act
      const { scope } = app(document.body, {}, node(TestComponent));
      refresh(scope);

      // ** Assert
      expect(onpreblueprint).toHaveBeenCalledTimes(1);
    });
  });
});
