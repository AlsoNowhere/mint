const mint = require("../../../dist/mint-test");

const { app, component, element } = mint;

const content = "Plum";

describe("Component that defines children in its content", () => {
  describe("When _children is only content", () => {
    const Sub = component("div", null, null, "_children");
    const Main = component("main", null, null, element(Sub, null, content));
    test("Should add the content of the parent Component to the child Component", () => {
      app(document.body, {}, element(Main));
      const [main] = document.body.children;
      const [div] = main.children;
      expect(div.textContent).toBe(content);
    });
  });

  describe("When _children is inside Array", () => {
    const Sub = component("div", null, null, ["_children"]);
    const Main = component("main", null, null, element(Sub, null, content));
    test("Should add the content of the parent Component to the child Component", () => {
      app(document.body, {}, element(Main));
      const [main] = document.body.children;
      const [div] = main.children;
      expect(div.textContent).toBe(content);
    });
  });
});
