const { app, node, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor -- Events", () => {
  afterEach(clearApp);

  describe("When a list of objects with events", () => {
    test("Should output list of elements and add events", () => {
      // ** Arrange
      const test = jest.fn();
      const testData = ["One", "Two"];
      const rootScope = {
        list: testData,
        run() {
          test();
        },
      };
      const content = node(
        "div",
        null,
        node(
          "div",
          { mFor: mFor("list"), mKey: "_i", "(click)": "run" },
          "{_x}"
        )
      );

      // ** Act
      app(document.body, rootScope, content);

      // ** Assert
      const { lastChild } = document.body;
      const [div1, div2] = lastChild.children;
      expect(div1.textContent).toBe(testData[0]);
      expect(div2.textContent).toBe(testData[1]);
      div1.dispatchEvent(new Event("click"));
      expect(test).toHaveBeenCalled();
    });
  });
});
