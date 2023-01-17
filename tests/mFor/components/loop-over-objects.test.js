const mint = require("../../../dist/mint-test");

const { app, element, component } = mint;

describe("mFor -- components -- objects", () => {
  test("Should output list of elements", () => {
    const data = {
      list: ["One", "Two"].map((x) => ({ propo: x })),
    };
    const Basic = component("div", null, null, "_children");
    app(
      document.body,
      data,
      element(Basic, { "m-for": "list", "m-key": "_i" }, "{propo}")
    );
    const [div1, div2] = document.body.children;
    expect(div1.innerText).toBe(data[0]);
    expect(div2.innerText).toBe(data[1]);
  });
});
