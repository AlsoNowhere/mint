const { Store } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Create a Store", () => {
  afterEach(clearApp);

  test("Should create a new Store with the given values", () => {
    // ** Arrange
    const testValue = "Example";

    // ** Act
    class TestStore extends Store {
      constructor() {
        super({ test: testValue });
      }
    }
    const newStore = new TestStore({
      test: testValue,
    });

    // ** Assert
    expect(newStore.test).toBe(testValue);

    {
      const descriptors = Object.getOwnPropertyDescriptors(newStore);

      // ** writable
      expect(descriptors.test.hasOwnProperty("writable")).toBe(true);
      // ** enumerable
      expect(descriptors.test.hasOwnProperty("enumerable")).toBe(true);
      // ** configurable
      expect(descriptors.test.hasOwnProperty("configurable")).toBe(true);

      // ** writable
      expect(descriptors.test.writable).toBe(true);
      // ** enumerable
      expect(descriptors.test.enumerable).toBe(true);
      // ** configurable
      expect(descriptors.test.configurable).toBe(false);
    }
  });
});
