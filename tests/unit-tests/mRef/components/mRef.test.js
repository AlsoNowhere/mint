const { app, node, component, mRef } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mRef -- Components", () => {
  afterEach(clearApp);

  describe("Get a reference to a Component Node", () => {
    describe("If mRef is defined on Component props", () => {
      test("Should add a reference to the Node on the parentScope", () => {
        // ** Arrange
        const Basic = component("article");

        // ** Act
        const { rootScope } = app(
          document.body,
          {},
          node(Basic, { mRef: mRef("elementRef") })
        );

        // ** Assert
        const { lastChild: article } = document.body;
        expect(article instanceof HTMLElement).toBe(true);
        expect(article.nodeName).toBe("ARTICLE");
        expect(rootScope.elementRef).toBe(article);
      });
    });

    describe("If mRef is defined on Component attributes", () => {
      test("Should add a reference to the Node on the ComponentScope", () => {
        // ** Arrange
        const rootScope = {};
        let componentScope;
        const BasicComponent = component(
          "article",
          function () {
            componentScope = this;
          },
          { mRef: mRef("elementRef") }
        );

        // ** Act
        app(document.body, rootScope, node(BasicComponent));

        // ** Assert
        const { lastChild: article } = document.body;
        expect(componentScope.elementRef).toBe(article);
      });
    });
  });
});
