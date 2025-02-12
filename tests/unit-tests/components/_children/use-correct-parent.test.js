const {
  app,
  component,
  node,
  mIf,
  refresh,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component that defines children in its content", () => {
  afterEach(clearApp);

  describe("When child is defined by mIf", () => {
    describe("RootScope", () => {
      test("Should add elements to the correct parent", () => {
        // ** Arrange
        const Section = component("section", null, null, "_children");
        const Article = component("article");

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          {
            case: true,
          },
          node(
            Section,
            { "[case]": "case" },
            node(Article, { mIf: mIf("case"), "[case]": "case" })
          )
        );

        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: section } = document.body;
        const [article] = section.children;
        expect(section.nodeName).toBe("SECTION");
        expect(article.nodeName).toBe("ARTICLE");
      });
    });

    describe("Component scope", () => {
      test("Should add elements to the correct parent", () => {
        // ** Arrange
        const Section = component("section", null, null, "_children");
        let appScope;
        const App = component(
          "div",
          function () {
            this.case = false;
            appScope = this;
          },
          null,
          node(
            Section,
            { "[case]": "case" },
            node("article", { mIf: mIf("case"), "[case]": "case" })
          )
        );

        // ** Act
        const { scope } = app(document.body, {}, node(App));
        appScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: div } = document.body;
        const [section] = div.children;
        const [article] = section.children;
        expect(section.nodeName).toBe("SECTION");
        expect(article.nodeName).toBe("ARTICLE");
      });
    });
  });
});
