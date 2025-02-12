const {
  app,
  node,
  component,
  Resolver,
  refresh,
} = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Resolver", () => {
  afterEach(clearApp);

  describe("Define a Component property using Resolver on a refresh", () => {
    test("Should add the property as a getter", () => {
      // ** Arrange
      const testData = { one: "1" };
      let componentScope;
      const Basic = component(
        "div",
        class BasicComponent {
          constructor() {
            componentScope = this;
          }
        },
        null,
        "Content: {value}"
      );

      // ** Act
      const { scope } = app(document.body, {}, node(Basic));
      const { lastChild: div } = document.body;
      componentScope.value = new Resolver(() => testData.one);
      refresh(scope);

      // ** Assert
      expect(div.textContent).toBe("Content: 1");
      expect(componentScope.value instanceof Resolver).toBe(false);
      expect(componentScope.value).toBe("1");
    });
  });
});
