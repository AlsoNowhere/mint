const mint = require("../../../dist/mint-test");

const { app, component, element } = mint;

const content = "Plum";

describe("Component that defines children in its content", () => {
  describe("When _children is inside other content", () => {
    const Sub = component("section", null, null, [
      element("div", null, "_children"),
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
      const [section] = main.children;
      const [div] = section.children;
      const [span] = div.children;
      expect(span.textContent).toBe(content);
    });
  });
});
