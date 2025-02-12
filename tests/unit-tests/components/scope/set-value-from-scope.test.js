const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Components", () => {
  afterEach(clearApp);

  describe("Use value from scope in text", () => {
    test("Should use value from Component scope", () => {
      // ** Arrange
      const value = "Orange";
      const content = "Here is content {test}";
      const Basic = component(
        "div",
        function () {
          this.test = value;
        },
        null,
        content
      );

      // ** Act
      app(document.body, {}, node(Basic));
      const [div] = document.body.children;

      // ** Assert
      expect(div.textContent).toBe(`Here is content ${value}`);
    });
  });

  describe("Use value from scope in attribute", () => {
    test("Should use value from Component scope", () => {
      // ** Arrange
      const value = "Orange";
      const Basic = component(
        "div",
        function () {
          this.test = value;
        },
        { class: "position {test}" }
      );

      // ** Act
      app(document.body, {}, node(Basic));
      const [div] = document.body.children;

      // ** Assert
      expect(div.classList.contains(value)).toBe(true);
    });
  });
});
