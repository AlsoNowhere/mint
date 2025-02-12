const { app, node, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mIf - Siblings", () => {
  afterEach(clearApp);

  describe("When false", () => {
    describe("When first item", () => {
      test("Should not add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: false };
        const content = node("div", null, [
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2).toBe(undefined);
      });
    });

    describe("When last item", () => {
      test("Should not add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: false };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2).toBe(undefined);
      });
    });

    describe("When middle item", () => {
      test("Should not add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: false };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2, ele3] = div.children;
        expect(ele1.nodeName).toBe("SECTION");
        expect(ele2.nodeName).toBe("SECTION");
        expect(ele3).toBe(undefined);
      });
    });
  });

  describe("When true", () => {
    describe("When first item", () => {
      test("Should add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: true };
        const content = node("div", null, [
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = rootElement;
        const [ele1, ele2] = div.children;
        expect(ele1.nodeName).toBe("DIV");
        expect(ele2.nodeName).toBe("SECTION");
      });
    });

    describe("When last item", () => {
      test("Should add the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: true };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

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
        const rootScope = { case: true };
        const content = node("div", null, [
          node("section"),
          node("div", { mIf: mIf("case") }, "Content"),
          node("section"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

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
