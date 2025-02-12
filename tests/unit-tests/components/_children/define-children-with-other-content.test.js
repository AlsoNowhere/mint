const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Defines _children as content sibling", () => {
  afterEach(clearApp);

  test("Should add the content of the parent Component to the child Component", () => {
    // ** Arrange
    const content = "Plum";
    const Section = component("section", null, null, [
      "_children",
      node("span", null, " and other things"),
    ]);
    const Main = component(
      "main",
      null,
      null,
      node(Section, null, node("span", null, content))
    );

    // ** Act
    app(document.body, {}, node(Main));
    const { lastChild: main } = document.body;
    const [div] = main.children;
    const [span1, span2] = div.children;

    // ** Assert
    expect(span1.textContent).toBe(content);
    expect(span2.textContent).toBe(" and other things");
  });
});
