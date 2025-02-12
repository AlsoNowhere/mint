const { app, node, component, Resolver } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Resolver", () => {
  afterEach(clearApp);

  describe("Define a Component property using Resolver function", () => {
    test("Should add the property as a getter", () => {
      // ** Arrange
      const testData = { one: "1" };
      let scope;
      const Basic = component(
        "div",
        class BasicComponent {
          constructor() {
            this.value = new Resolver(() => testData.one);
            scope = this;
          }
        },
        null,
        "Content: {value}"
      );

      // ** Act
      app(document.body, {}, node(Basic));

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.textContent).toBe("Content: 1");
      expect(scope.value instanceof Resolver).toBe(false);
      expect(scope.value).toBe("1");

      const { configurable, enumerable, set, get } =
        Object.getOwnPropertyDescriptor(scope, "value");

      expect(configurable).toBe(true);
      expect(enumerable).toBe(true);
      expect(set).toBe(undefined);
      expect(get instanceof Function).toBe(true);
    });
  });

  describe("Define a Component property using Resolver string accessor", () => {
    test("Should add the property as a getter", () => {
      // ** Arrange
      let scope;
      const Basic = component(
        "div",
        class BasicComponent {
          constructor() {
            this.test = { two: "2" };
            this.value = new Resolver("test.two");
            scope = this;
          }
        },
        null,
        "Content: {value}"
      );

      // ** Act
      app(document.body, {}, node(Basic));

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.textContent).toBe("Content: 2");
      expect(scope.value instanceof Resolver).toBe(false);
      expect(scope.value).toBe("2");

      const { configurable, enumerable, set, get } =
        Object.getOwnPropertyDescriptor(scope, "value");

      expect(configurable).toBe(true);
      expect(enumerable).toBe(true);
      expect(set).toBe(undefined);
      expect(get instanceof Function).toBe(true);
    });
  });
});
