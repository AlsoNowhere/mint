const { app, node, refresh, mIf, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor with mIf - when mFor changes", () => {
  afterEach(clearApp);

  describe("When mFor is added to", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testData = ["One", "Two"];
      const testScope = { case: true, list: testData };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node("div", { mFor: mFor("list"), mKey: "_i" }, "{_x}"),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      const { scope } = app(rootElement, testScope, content);
      testData.push("Three");
      refresh(scope);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, ifDiv, forDiv1, forDiv2, forDiv3, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(ifDiv.textContent).toBe("Optional content");
      expect(forDiv1.textContent).toBe("One");
      expect(forDiv2.textContent).toBe("Two");
      expect(forDiv3.textContent).toBe("Three");
      expect(div2.textContent).toBe("Content 2");
    });
  });

  describe("When mFor is removed from", () => {
    test("Should add elements in the correct place", () => {
      // ** Arrange
      const rootElement = document.body;
      const testData = ["One", "Two"];
      const testScope = { case: true, list: testData };
      const content = node("main", null, [
        node("div", null, "Content 1"),
        node("div", { mIf: mIf("case") }, "Optional content"),
        node("div", { mFor: mFor("list"), mKey: "_i" }, "{_x}"),
        node("div", null, "Content 2"),
      ]);

      // ** Act
      const { scope } = app(rootElement, testScope, content);
      testData.shift();
      refresh(scope);

      // ** Assert
      const { lastChild: main } = document.body;
      const [div1, ifDiv, forDiv1, div2] = main.children;
      expect(div1.textContent).toBe("Content 1");
      expect(ifDiv.textContent).toBe("Optional content");
      expect(forDiv1.textContent).toBe("Two");
      expect(div2.textContent).toBe("Content 2");
    });
  });
});
