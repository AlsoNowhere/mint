const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component that defines children in its content", () => {
  afterEach(clearApp);

  // ** Arrange
  const content = "Plum";

  describe("When _children is only content", () => {
    test("Should add the content of the parent Component to the child Component", () => {
      // ** Arrange
      const Section = component("section", null, null, "_children");

      // ** Act
      app(document.body, {}, node(Section, null, content));
      const [section] = document.body.children;

      // ** Assert
      expect(section.textContent).toBe(content);
    });
  });

  describe("When _children is inside Array", () => {
    test("Should add the content of the parent Component to the child Component", () => {
      // ** Arrange
      const Section = component("section", null, null, ["_children"]);

      // ** Act
      app(document.body, {}, node(Section, null, content));
      const [section] = document.body.children;

      // ** Assert
      expect(section.textContent).toBe(content);
    });
  });
});
