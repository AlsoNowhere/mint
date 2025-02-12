const { app, node, mIf, refresh } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mIf - Refresh with siblings", () => {
  afterEach(clearApp);

  describe("From false to true", () => {
    describe("When first item", () => {
      test("Should add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: false };
        const content = node("div", null, [
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        const { scope } = app(rootElement, rootScope, content);
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2).toBe(undefined);
      });
    });

    describe("When last item", () => {
      test("Should add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: false };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
        ]);

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2.nodeName).toBe("DIV");
      });
    });

    describe("When middle item", () => {
      test("Should add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: false };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2, ele3] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2.nodeName).toBe("DIV");
        expect(ele3.nodeName).toBe("SECTION");
      });
    });
  });
});
