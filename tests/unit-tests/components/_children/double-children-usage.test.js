const { app, component, node, div } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component that defines _children twice in its content", () => {
  afterEach(clearApp);

  // ** Arrange
  const content = "Plum";

  let i = 0;

  const Plum = component(
    "div",
    function () {
      this.id = ++i;
    },
    null,
    "Plum: {id}"
  );

  describe("When _children is Component", () => {
    test("Should add the content with a scope for each _children usage", () => {
      // ** Arrange
      const Section = component("section", null, null, [
        div("_children"),
        div("_children"),
        div("_children"),
      ]);

      // ** Act
      app(document.body, {}, node(Section, null, node(Plum)));
      const [section] = document.body.children;
      const [div1, div2, div3] = section.children;

      // ** Assert
      expect(div1.textContent).toBe("Plum: 1");
      expect(div2.textContent).toBe("Plum: 2");
      expect(div3.textContent).toBe("Plum: 3");
    });
  });
});
