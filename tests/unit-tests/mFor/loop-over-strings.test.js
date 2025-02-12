const { app, node, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor - String values", () => {
  afterEach(clearApp);

  describe("When a simple list of strings", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testData = ["One", "Two", "Three"];
      const rootElement = document.body;
      const rootScope = { list: testData };
      const content = node(
        "div",
        null,
        node(
          "div",
          { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
          "{_x}"
        )
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
      expect(div1.attributes["data-index"].nodeValue).toBe("0");
      expect(div2.attributes["data-index"].nodeValue).toBe("1");
      expect(div3.attributes["data-index"].nodeValue).toBe("2");
    });
  });

  describe("When missing mKey", () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    afterEach(() => {
      consoleErrorMock.mockRestore();
    });

    test("Should error", () => {
      // ** Arrange
      const testData = ["One", "Two", "Three"];
      const rootElement = document.body;
      const rootScope = { list: testData };
      const content = node(
        "div",
        null,
        node("div", { mFor: mFor("list"), "[data-index]": "_i" }, "{_x}")
      );

      // ** Act
      const run = () => {
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(run).toThrow("MINT ERROR -- mFor must have a mKey attribute");
    });
  });
});
