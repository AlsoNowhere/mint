const { app, component, node, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - String values", () => {
  afterEach(clearApp);

  describe("When a simple list of strings", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testData = ["One", "Two", "Three"];
      const rootElement = document.body;
      const rootScope = { list: testData };
      const Basic = component("div", null, null, "{_x}");
      const content = node(
        "div",
        null,
        node(Basic, { mFor: mFor("list"), mKey: "_i" })
      );

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testData[0]);
      expect(div2.textContent).toBe(testData[1]);
      expect(div3.textContent).toBe(testData[2]);
    });
  });
});
