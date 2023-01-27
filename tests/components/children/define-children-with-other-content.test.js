const mint = require("../../../dist/mint-test");

const { app, component, element } = mint;

const content = "Plum";

describe("Component that defines children in its content", () => {
  describe("When _children is not the only content", () => {
    const Sub = component("div", null, null, [
      "_children",
      element("span", null, "and other things"),
    ]);
    const Main = component(
      "main",
      null,
      null,
      element(Sub, null, element("span", null, content))
    );
    test("Should add the content of the parent Component to the child Component", () => {
      app(document.body, {}, element(Main));
      const [main] = document.body.children;
      const [div] = main.children;
      const [span1, span2] = div.children;
      expect(span1.textContent).toBe(content);
      expect(span2.textContent).toBe("and other things");
    });
  });
});
