const { app, node, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor - Duplicate keys", () => {
  afterEach(clearApp);

  describe("When a list of objects with some duplicate keys", () => {
    let consoleWarnMock;

    beforeEach(() => {
      consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
    });

    afterEach(() => {
      consoleWarnMock.mockRestore();
    });

    test("Should output list of elements and ignore duplicates", () => {
      // ** Arrange
      const testData = [
        { value: "One", id: "1" },
        { value: "Two", id: "1" },
        { value: "Three", id: "3" },
      ];
      const rootElement = document.body;
      const rootScope = { list: testData };
      const content = node(
        "div",
        null,
        node(
          "div",
          { mFor: mFor("list"), mKey: "id", "[data-index]": "_i" },
          "{value}"
        )
      );

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      expect(consoleWarnMock).toHaveBeenCalledWith(
        "mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. id"
      );
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(2);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testData[0].value);
      expect(div2.textContent).toBe(testData[2].value);
      expect(div3).toBe(undefined);
      expect(div1.attributes["data-index"].nodeValue).toBe("0");
      expect(div2.attributes["data-index"].nodeValue).toBe("1");
    });
  });
});
