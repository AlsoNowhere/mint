const {
  app,
  node,
  refresh,
  mIf,
  template,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mTemplate with mIf - when mTemplate changes", () => {
  afterEach(clearApp);

  describe("When mTemplate is added to", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue = "Generated";
      const testContent1 = [node("span", null, testValue)];
      const testContent2 = [
        node("span", null, testValue),
        node("span", null, testValue),
      ];
      const generatedContent = function () {
        return this.check ? testContent1 : testContent2;
      };
      const testScope = { case: true, check: true, generatedContent };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node(template({ conditionedBy: "check" }, "generatedContent")),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      const { scope, rootScope } = app(rootElement, testScope, content);
      const { lastChild: main } = document.body;
      const [Adiv1, AifDiv, ATemplate1, Adiv2] = main.children;
      rootScope.check = false;
      refresh(scope);

      // ** Assert
      const [Bdiv1, BifDiv, BTemplate1, BTemplate2, Bdiv2] = main.children;
      expect(Adiv1.textContent).toBe("Content 1");
      expect(AifDiv.textContent).toBe("Optional content");
      expect(ATemplate1.textContent).toBe(testValue);
      expect(Adiv2.textContent).toBe("Content 2");

      expect(Bdiv1.textContent).toBe("Content 1");
      expect(BifDiv.textContent).toBe("Optional content");
      expect(BTemplate1.textContent).toBe(testValue);
      expect(BTemplate2.textContent).toBe(testValue);
      expect(Bdiv2.textContent).toBe("Content 2");

      expect(Adiv1).toBe(Bdiv1);
      expect(AifDiv).toBe(BifDiv);
      expect(ATemplate1).not.toBe(BTemplate1);
      expect(Adiv2).toBe(Bdiv2);
    });
  });

  describe("When mTemplate is removed from", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue = "Generated";
      const testContent1 = [node("span", null, testValue)];
      const testContent2 = [];
      const generatedContent = function () {
        return this.check ? testContent1 : testContent2;
      };
      const testScope = { case: true, check: true, generatedContent };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node(template({ conditionedBy: "check" }, "generatedContent")),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      const { scope, rootScope } = app(rootElement, testScope, content);
      const { lastChild: main } = document.body;
      const [Adiv1, AifDiv, ATemplate1, Adiv2] = main.children;
      rootScope.check = false;
      refresh(scope);

      // ** Assert
      const [Bdiv1, BifDiv, Bdiv2] = main.children;
      expect(Adiv1.textContent).toBe("Content 1");
      expect(AifDiv.textContent).toBe("Optional content");
      expect(ATemplate1.textContent).toBe(testValue);
      expect(Adiv2.textContent).toBe("Content 2");

      expect(Bdiv1.textContent).toBe("Content 1");
      expect(BifDiv.textContent).toBe("Optional content");
      expect(Bdiv2.textContent).toBe("Content 2");

      expect(Adiv1).toBe(Bdiv1);
      expect(AifDiv).toBe(BifDiv);
      expect(Adiv2).toBe(Bdiv2);
    });
  });
});
