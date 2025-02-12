const { app, node, mFor, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor with mIf - mIf after mFor", () => {
  afterEach(clearApp);

  describe("Render when case is true", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testData = ["One", "Two"];
      const testScope = { case: true, list: testData };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mFor: mFor("list"), mKey: "_i" }, "{_x}"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      app(rootElement, testScope, content);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, forDiv1, forDiv2, ifDiv, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(forDiv1.textContent).toBe("One");
      expect(forDiv2.textContent).toBe("Two");
      expect(ifDiv.textContent).toBe("Optional content");
      expect(div2.textContent).toBe("Content 2");
    });
  });

  describe("Render when case is false", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testData = ["One", "Two"];
      const testScope = { case: false, list: testData };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mFor: mFor("list"), mKey: "_i" }, "{_x}"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      app(rootElement, testScope, content);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, forDiv1, forDiv2, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(forDiv1.textContent).toBe("One");
      expect(forDiv2.textContent).toBe("Two");
      expect(div2.textContent).toBe("Content 2");
    });
  });
});
