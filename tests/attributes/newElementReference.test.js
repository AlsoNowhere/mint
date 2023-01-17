const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("Add a reference to an element to a Component's scope", () => {
  test("Should add a reference to the element", () => {
    const data = {};

    app(document.body, data, element("div", { "m-ref": "ref" }));

    const [div] = document.body.children;

    expect(data.ref).toBe(div);
  });
});
