const { app, node, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor - Simple list", () => {
  afterEach(clearApp);

  describe("When a simple list", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testData = [1, 2];
      const rootElement = document.body;
      const rootScope = { list: testData };
      const content = node(
        "div",
        null,
        node("div", { mFor: mFor("list"), mKey: "_i" })
      );

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(2);
      const [div1, div2] = div.children;

      expect(div1.attributes.mFor).toBe(undefined);
      expect(div1.attributes.mKey).toBe(undefined);

      expect(div2.attributes.mFor).toBe(undefined);
      expect(div2.attributes.mKey).toBe(undefined);
    });
  });
});
