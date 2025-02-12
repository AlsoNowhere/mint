const { app, node, mIf, template } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mTemplate with mIf - mIf before mTemplate", () => {
  afterEach(clearApp);

  describe("Render when case is true", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue = "Generated";
      const generatedContent = () => [node("span", null, testValue)];
      const testScope = { case: true, generatedContent };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node(template("generatedContent")),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      app(rootElement, testScope, content);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, ifDiv, templateDiv, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(ifDiv.textContent).toBe("Optional content");
      expect(templateDiv.textContent).toBe(testValue);
      expect(div2.textContent).toBe("Content 2");
    });
  });

  describe("Render when case is false", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testValue = "Generated";
      const generatedContent = () => [node("span", null, testValue)];
      const testScope = { case: false, generatedContent };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node(template("generatedContent")),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      app(rootElement, testScope, content);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, templateDiv, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(templateDiv.textContent).toBe(testValue);
      expect(div2.textContent).toBe("Content 2");
    });
  });
});
