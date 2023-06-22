const mint = require("../../dist/mint-test");

const { Store } = mint;

const testValue = "Example";

const basicStore = new Store({
  one: testValue,
});

describe("Simple Store", () => {
  test("Should give store the value", () => {
    expect(basicStore.one).toBe(testValue);
  });
});
