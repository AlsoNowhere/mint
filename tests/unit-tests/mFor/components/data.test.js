const { app, component, node, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - Passing data", () => {
  afterEach(clearApp);

  describe("When using a list of objects", () => {
    test("Should add forData to top Object and retain Component scope as parent scope on prototype", () => {
      // ** Arrange
      const rootElement = document.body;
      const testData = [{ value: "One" }];
      const rootScope = { list: testData };
      let testScope;
      const Basic = component(
        "div",
        function () {
          this.parentComponent = "isTop";
          this.oninit = function () {
            testScope = this;
          };
        },
        null,
        "{value}"
      );
      const content = node(
        "div",
        null,
        node(Basic, { mFor: mFor("list"), mKey: "_i" })
      );

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      expect(testScope.value).toBe("One");
      expect(testScope.parentComponent).toBe("isTop");
      expect(testScope.hasOwnProperty("value")).toBe(true);
      expect(testScope.hasOwnProperty("parentComponent")).toBe(false);
    });
  });
});
