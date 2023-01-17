const mint = require("../../dist/mint-test");

const { Store } = mint;

describe("Store creation -- Passing not initialData", () => {
  test("Should error", () => {
    expect(() => new Store()).toThrow(
      "You must provide an Object to create a new Store."
    );
  });
});

describe("Store creation", () => {
  test("Should not error", () => {
    const store = new Store({
      one: 1,
    });
    expect(store.one).toBe(1);
  });
});
