const { app, node, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mIf - Simple cases - Inverted", () => {
  afterEach(clearApp);

  describe("When value is true", () => {
    test("Should retain the element", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = { case: true };
      const content = node("div", { mIf: mIf("!case") }, "Content");

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const divs = rootElement.querySelector("div");
      expect(divs).toBe(null);
    });
  });

  describe("When value is false", () => {
    test("Should not add the element", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = { case: false };
      const content = node("div", { mIf: mIf("!case") }, "Content");

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div).not.toBe(undefined);
      expect(div.attributes.mIf).toBe(undefined);
    });
  });

  describe("When value is deep in object", () => {
    test("Should not add the element", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = { obj: { case: true } };
      const content = node("div", { mIf: mIf("!obj.case") }, "Content");

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const divs = rootElement.querySelector("div");
      expect(divs).toBe(null);
    });
  });
});
