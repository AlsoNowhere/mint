const { app } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Lifecycle on app", () => {
  afterEach(clearApp);

  describe("oninit", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const oninit = jest.fn();
      const rootScope = { oninit };

      // ** Act
      app(document.body, rootScope, "");

      // ** Assert
      expect(oninit).toHaveBeenCalledTimes(1);
    });
  });
});
