const { app, component, node, refresh } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Refresh Component props", () => {
  afterEach(clearApp);

  describe("Text content", () => {
    test("Should take priority of props and parent scope", () => {
      // ** Arrange
      const testValue1 = "Lemon";
      const testValue2 = "Melon";
      let componentScope;
      const BasicComponent = component(
        "div",
        function () {
          componentScope = this;
        },
        null,
        "Component prop - {test}"
      );

      // ** Act
      const content = node(BasicComponent, { test: testValue1 });
      const { scope } = app(document.body, {}, content);
      componentScope.test = testValue2;
      refresh(scope);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.textContent).toBe(`Component prop - ${testValue1}`);
    });
  });

  describe("Attribute value", () => {
    test("Should take priority of props and parent scope", () => {
      // ** Arrange
      const testValue1 = "Lemon";
      const testValue2 = "Melon";
      let componentScope;
      const elementContent = node("div", { class: "test {test}" });
      const BasicComponent = component(
        "div",
        function () {
          componentScope = this;
        },
        null,
        elementContent
      );

      // ** Act
      const content = node(BasicComponent, { test: testValue1 });
      const { scope } = app(document.body, {}, content);
      componentScope.test = testValue2;
      refresh(scope);

      // ** Assert
      const { lastChild: div1 } = document.body;
      const { lastChild: div2 } = div1;
      expect(div2.classList.contains(testValue1)).toBe(true);
      expect(div1.attributes["test"]).toBe(undefined);
    });
  });
});
