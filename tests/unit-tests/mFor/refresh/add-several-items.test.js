const { app, node, refresh, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Refresh", () => {
  afterEach(clearApp);

  describe("Add several items", () => {
    test("Should add item to end", () => {
      // ** Arrange
      const testData = ["One"];
      const rootScope = { list: testData };
      const content = node("div", { mFor: mFor("list"), mKey: "_i" }, "{_x}");

      // ** Act
      const { scope } = app(
        document.body,
        rootScope,
        node("div", null, content)
      );

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(1);
      let [div1] = div.children;
      expect(div1.textContent).toBe(testData[0]);

      // ** Act
      const newValue1 = "Two";
      testData.push(newValue1);
      refresh(scope);

      // ** Assert
      expect(div.children.length).toBe(2);
      [div1, div2] = div.children;
      expect(div1.textContent).toBe(testData[0]);
      expect(div2.textContent).toBe(testData[1]);

      // ** Act
      const newValue2 = "Three";
      testData.push(newValue2);
      refresh(scope);

      // ** Assert
      expect(div.children.length).toBe(3);
      [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testData[0]);
      expect(div2.textContent).toBe(testData[1]);
      expect(div3.textContent).toBe(testData[2]);
    });
  });
});
