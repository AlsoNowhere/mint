const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("Basic render one mint element", () => {
  test("Should not error", () => {
    const content = "renders";

    app(document.body, {}, element("div", null, content));

    const [div] = document.body.children;

    expect(div.textContent).toBe(content);
  });
});

describe("Basic render an Array of mint elements", () => {
  test("Should not error", () => {
    const content = "renders";

    app(document.body, {}, [
      element("div", null, content),
      element("div", null, content),
    ]);

    const [div1, div2] = document.body.children;

    expect(div1.textContent).toBe(content);
    expect(div2.textContent).toBe(content);
  });
});
