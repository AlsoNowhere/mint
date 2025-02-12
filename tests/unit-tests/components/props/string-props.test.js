const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component props", () => {
  afterEach(clearApp);

  describe("Add string prop as text", () => {
    test("Should add prop as new value on scope", () => {
      // ** Arrange
      const testValue = "Lemon";
      const BasicComponent = component(
        "div",
        null,
        null,
        "Component prop - {test}"
      );

      // ** Act
      const content = node(BasicComponent, { test: testValue });
      app(document.body, {}, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.textContent).toBe(`Component prop - ${testValue}`);
    });
  });

  describe("Add string prop as attribute", () => {
    test("Should add prop as new value on scope", () => {
      // ** Arrange
      const testValue = "Lemon";
      const BasicComponent = component("div", null, { class: "test {test}" });

      // ** Act
      const content = node(BasicComponent, { test: testValue });
      app(document.body, {}, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.classList.contains(testValue)).toBe(true);
    });
  });
});
