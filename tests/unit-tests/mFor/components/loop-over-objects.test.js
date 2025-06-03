const { app, component, node, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - Object values", () => {
  afterEach(clearApp);

  describe("When a list of objects", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
      const rootElement = document.body;
      const rootScope = { list: testData };
      const Basic = component("div", null, null, "{value}");
      const content = node("div", null, node(Basic, { mFor: mFor("list"), mKey: "_i" }));

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testData[0].value);
      expect(div2.textContent).toBe(testData[1].value);
      expect(div3.textContent).toBe(testData[2].value);
    });
  });

  describe("Cannot add mFor to Component attributes definitions", () => {
    test("Should error as appropriate", () => {
      const runTest = () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
        const rootElement = document.body;
        const rootScope = { list: testData };
        const BasicComponent = component("div", null, { mFor: mFor("list"), mKey: "_i" }, "{value}");
        const content = node(BasicComponent);

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).toThrow(
        "MINT ERROR -- Cannot add mFor directly to Components attribute in Component definition."
      );
    });
  });
});
