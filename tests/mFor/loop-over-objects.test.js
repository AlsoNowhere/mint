const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("mFor -- objects", () => {
  test("Should output list of elements", () => {
    const data = {
      list: ["One", "Two"].map((x) => ({ propo: x })),
    };
    app(
      document.body,
      data,
      element("div", { "m-for": "list", "m-key": "_i" }, "{propo}")
    );
    const [div1, div2] = document.body.children;
    expect(div1.innerText).toBe(data[0]);
    expect(div2.innerText).toBe(data[1]);
  });
});
