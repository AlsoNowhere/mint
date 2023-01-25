const mint = require("../../dist/mint-test");

const { app, component, element } = mint;

const BasicComponent = component("div", function () {}, null, "Content");

describe("mIf - when true - component", () => {
  test("Should not remove element", () => {
    const content = "renders";

    app(
      document.body,
      {
        case: true,
      },
      [
        element("div", null, content),
        element(BasicComponent, { "m-if": "case" }, content),
        element("div", null, content),
      ]
    );

    expect(document.body.children.length).toBe(3);
  });
});
