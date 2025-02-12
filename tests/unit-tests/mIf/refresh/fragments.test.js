const {
  app,
  component,
  node,
  mIf,
  div,
  refresh,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mIf and Mint Fragments", () => {
  afterEach(clearApp);

  describe("when true to false", () => {
    test("Should create a div", () => {
      // ** Act
      const { scope, rootScope } = app(
        document.body,
        { case: true },
        node("<>", { mIf: mIf("case") }, node("div"))
      );
      rootScope.case = false;
      refresh(scope);

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).toBe(null);
    });
  });

  describe("when false to true", () => {
    describe("when element", () => {
      test("Should create a div", () => {
        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node("<>", { mIf: mIf("case") }, node("div"))
        );
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild } = document.body;
        expect(lastChild).not.toBe(null);
        expect(lastChild.nodeName).toBe("DIV");
      });
    });

    describe("when component", () => {
      test("Should create a div", () => {
        // ** Arrange
        const Main = component(
          "main",
          null,
          null,
          node("div", null, "_children")
        );

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(
            Main,
            { "[case]": "case" },
            node("span", { mIf: mIf("case") }, "Tanoshi")
          )
        );
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: main } = document.body;
        const [div] = main.children;
        const [span] = div.children;
        expect(span).not.toBe(undefined);
      });
    });
  });

  describe("with siblings", () => {
    test("Should create a div", () => {
      // ** Act
      const { scope, rootScope } = app(
        document.body,
        { case: false },
        node("div", null, [
          node("section"),
          node("<>", { mIf: mIf("case") }, node("div")),
          node("article"),
        ])
      );
      rootScope.case = true;
      refresh(scope);

      // ** Assert
      const { lastChild: div } = document.body;
      const [section, div2, article] = div.children;
      expect(section.nodeName).toBe("SECTION");
      expect(div2.nodeName).toBe("DIV");
      expect(article.nodeName).toBe("ARTICLE");
    });
  });

  describe("When adding siblings in, as children of Fragment", () => {
    describe("When at app root", () => {
      test("Should add content in the correct place", () => {
        // ** Arrange
        const List = component("<>", null, null, [
          div("One"),
          div({ mIf: mIf("case") }, "Two"),
          div("Three"),
        ]);

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(List, { "[case]": "case" })
        );
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const [div1, div2, div3] = document.body.children;
        expect(div1.textContent).toBe("One");
        expect(div2.textContent).toBe("Two");
        expect(div3.textContent).toBe("Three");
      });
    });

    describe("When children of Component", () => {
      test("Should add content in the correct place", () => {
        // ** Arrange
        const List = component("<>", null, null, [
          div("One"),
          div({ mIf: mIf("case") }, "Two"),
          div("Three"),
        ]);
        const Main = component(
          "main",
          null,
          null,
          node(List, { "[case]": "case" })
        );

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(Main, { "[case]": "case" })
        );
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: main } = document.body;
        const [div1, div2, div3] = main.children;
        expect(div1.textContent).toBe("One");
        expect(div2.textContent).toBe("Two");
        expect(div3.textContent).toBe("Three");
      });
    });

    describe("When mIf is part of a fragment Component", () => {
      test("Should add content in the correct place", () => {
        // ** Arrange
        const Lemon = component(
          "<>",
          null,
          null,
          div({ mIf: mIf("case") }, "Two")
        );
        const List = component("main", null, null, [
          div("One"),
          node(Lemon, { "[case]": "case" }),
          div("Three"),
        ]);

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(List, { "[case]": "case" })
        );
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: main } = document.body;
        const [div1, div2, div3] = main.children;
        expect(div1.textContent).toBe("One");
        expect(div2.textContent).toBe("Two");
        expect(div3.textContent).toBe("Three");
      });
    });
  });
});
