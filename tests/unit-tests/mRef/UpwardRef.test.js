const {
  app,
  node,
  UpwardRef,
  component,
  mRef,
} = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mRef - UpwardRef", () => {
  afterEach(clearApp);

  describe("Use UpwardRef to get an element reference", () => {
    test("Should get a reference to the Node", () => {
      // ** Arrange
      const rootScope = {
        elementRef: new UpwardRef(null),
      };

      // ** Act
      app(document.body, rootScope, node("div", { mRef: mRef("elementRef") }));

      // ** Assert
      const { lastChild: div } = document.body;
      expect(rootScope.elementRef instanceof UpwardRef).toBe(true);
      expect(rootScope.elementRef.ref).toBe(div);
    });
  });

  describe("Use UpwardRef to get an element reference of a Component", () => {
    test("Should get a reference to the Node", () => {
      // ** Arrange
      const rootScope = {
        elementRef: new UpwardRef(null),
      };
      const BasicComponent = component("div");

      // ** Act
      app(
        document.body,
        rootScope,
        node(BasicComponent, { mRef: mRef("elementRef") })
      );

      // ** Assert
      const { lastChild: div } = document.body;
      expect(rootScope.elementRef instanceof UpwardRef).toBe(true);
      expect(rootScope.elementRef.ref).toBe(div);
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
          this.elementRef = new UpwardRef(null);
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
      expect(componentScope.elementRef instanceof UpwardRef).toBe(true);
      expect(componentScope.elementRef.ref).toBe(div2);
    });
  });
});
