const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Define children in Component content", () => {
  afterEach(clearApp);

  test("Should add the content of the parent Component to the child Component", () => {
    // ** Arrange
    const content = "Plum";
    const Section = component(
      "section",
      null,
      null,
      node("div", null, "_children")
    );
    const Main = component(
      "main",
      null,
      null,
      node(Section, null, node("span", null, content))
    );

    // ** Act
    app(document.body, {}, node(Main));
    const [main] = document.body.children;
    const [section] = main.children;
    const [div] = section.children;
    const [span] = div.children;

    // ** Assert
    expect(span.textContent).toBe(content);
  });
});
