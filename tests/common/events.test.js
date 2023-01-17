const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("Event -- Click event", () => {
  test("Should run event", () => {
    const test = jest.fn();
    app(document.body, { test }, element("div", { "(click)": "test" }));

    const [div] = document.body.children;

    div.dispatchEvent(new Event("click"));

    expect(test).toHaveBeenCalled();
  });
});
