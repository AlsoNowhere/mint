const mint = require("../../dist/mint-test");

const { app, element } = mint;

const content1 = "renders1";
const content2 = "renders2";

describe("mIf - when true", () => {
  test("Should not remove element", () => {
    app(
      document.body,
      {
        case: true,
      },
      [
        element("div", null, content1),
        element("div", { "m-if": "case" }, content1),
        element("div", null, content2),
      ]
    );

    const [div1, div2, div3] = document.body.children;

    expect(document.body.children.length).toBe(3);

    expect(div1.textContent).toBe(content1);
    expect(div2.textContent).toBe(content1);
    expect(div3.textContent).toBe(content2);
  });
});
