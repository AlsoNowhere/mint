const { refresh, Store } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("refresh - Store", () => {
  afterEach(clearApp);

  describe("Running refresh on store that has not been connected", () => {
    test("Should return gracely (without errors)", () => {
      // ** Arrange
      class ExampleStore extends Store {
        constructor() {
          super({});
        }
      }
      const store = new ExampleStore();

      // ** Act
      const runTest = () => {
        refresh(store);
      };

      // ** Assert
      expect(runTest).not.toThrow();
    });
  });
});
