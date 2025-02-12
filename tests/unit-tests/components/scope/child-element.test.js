const { app, component, node } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Components", () => {
  afterEach(clearApp);

  describe("Value from scope should apply to child elements", () => {
    test("Should use value from Component scope", () => {
      // ** Arrange
      const value = "Orange";
      const content = node("div", { class: "position {test}" });
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
      const [div1] = document.body.children;
      const [div2] = div1.children;

      // ** Assert
      expect(div2.classList.contains(value)).toBe(true);
    });
  });
});
