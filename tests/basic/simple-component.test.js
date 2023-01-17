const mint = require("../../dist/mint-test");

const { app, component, element } = mint;

const content = "Some content";

const BasicComponent = component("div", function () {}, null, content);

describe("Simple component", () => {
  test("Should not error", () => {
    app(document.body, {}, element(BasicComponent));
    const [div] = document.body.children;
    expect(div.textContent).toBe(content);
  });
});
