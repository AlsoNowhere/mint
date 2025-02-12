const { app, refresh, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component Lifecycle - oninit", () => {
  let consoleWarnMock;

  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  afterEach(clearApp);

  describe("Component first added", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const oninit = jest.fn();
      const TestComponent = component("div", function () {
        this.oninit = oninit;
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(oninit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component refreshed", () => {
    test("Should not run on refresh when nothing changes", () => {
      // ** Arrange
      const oninit = jest.fn();
      const TestComponent = component("div", function () {
        this.oninit = oninit;
      });

      // ** Act
      const { scope } = app(document.body, {}, node(TestComponent));
      refresh(scope);

      // ** Assert
      expect(oninit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Running refresh inside oninit", () => {
    test("Should throw error as this is not allowed", () => {
      // ** Arrange
      const TestComponent = component("div", function () {
        this.oninit = function () {
          refresh(this);
        };
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(consoleWarnMock).toHaveBeenCalledWith(
        "MINT WARN -- refresh() detected while still templating, refresh ignored."
      );
    });
  });
});
