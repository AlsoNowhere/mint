const {
  app,
  node,
  component,
  mRef,
  Store,
} = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mRef", () => {
  afterEach(clearApp);

  describe("Get a reference to an Element Node", () => {
    test("Should add a reference to the Node", () => {
      // ** Arrange

      // ** Act
      const { rootScope } = app(
        document.body,
        {},
        node("div", { mRef: mRef("elementRef") })
      );

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div instanceof HTMLElement).toBe(true);

      expect(rootScope.elementRef).toBe(div);
    });
  });

  describe("Get a reference to an Element Node inside a Component", () => {
    test("Should add a reference to the Node", () => {
      // ** Arrange
      const rootScope = {};
      let componentScope;
      const BasicComponent = component(
        "div",
        function () {
          componentScope = this;
        },
        null,
        node("div", { mRef: mRef("elementRef") })
      );

      // ** Act
      app(document.body, rootScope, node(BasicComponent));

      // ** Assert
      const { lastChild: div1 } = document.body;
      const { lastChild: div2 } = div1;
      expect(rootScope.elementRef).toBe(undefined);
      expect(componentScope.elementRef).toBe(div2);
    });
  });

  describe("When a Store is connected to a Component", () => {
    test("Should add a reference to the Store", () => {
      // ** Arrange
      const store = new Store({ elementRef: null });
      const BasicComponent = component(
        "div",
        function () {
          store.connect(this);
        },
        { mRef: mRef("elementRef") }
      );

      // ** Act
      app(document.body, {}, node(BasicComponent));

      // ** Assert
      const { lastChild: div1 } = document.body;
      expect(store.elementRef).toBe(div1);
    });
  });
});
