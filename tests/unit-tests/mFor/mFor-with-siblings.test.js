const { app, node, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mFor - With siblings", () => {
  afterEach(clearApp);

  describe("When a simple list", () => {
    describe("Item before only", () => {
      test("Should output list of elements", () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const content = node("ul", null, [
          node("li"),
          node(
            "li",
            { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
            "{_x}"
          ),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: ul } = document.body;
        expect(ul.children.length).toBe(4);
        const [, li2, li3, li4] = ul.children;
        expect(li2.textContent).toBe(testData[0]);
        expect(li3.textContent).toBe(testData[1]);
        expect(li4.textContent).toBe(testData[2]);
        expect(li2.attributes["data-index"].nodeValue).toBe("0");
        expect(li3.attributes["data-index"].nodeValue).toBe("1");
        expect(li4.attributes["data-index"].nodeValue).toBe("2");
      });
    });

    describe("Item after only", () => {
      test("Should output list of elements", () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const content = node("ul", null, [
          node(
            "li",
            { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
            "{_x}"
          ),
          node("li"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: ul } = document.body;
        expect(ul.children.length).toBe(4);
        const [li1, li2, li3] = ul.children;
        expect(li1.textContent).toBe(testData[0]);
        expect(li2.textContent).toBe(testData[1]);
        expect(li3.textContent).toBe(testData[2]);
        expect(li1.attributes["data-index"].nodeValue).toBe("0");
        expect(li2.attributes["data-index"].nodeValue).toBe("1");
        expect(li3.attributes["data-index"].nodeValue).toBe("2");
      });
    });

    describe("Item before and after", () => {
      test("Should output list of elements", () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const content = node("ul", null, [
          node("li"),
          node(
            "li",
            { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
            "{_x}"
          ),
          node("li"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: ul } = document.body;
        expect(ul.children.length).toBe(5);
        const [, li2, li3, li4] = ul.children;
        expect(li2.textContent).toBe(testData[0]);
        expect(li3.textContent).toBe(testData[1]);
        expect(li4.textContent).toBe(testData[2]);
        expect(li2.attributes["data-index"].nodeValue).toBe("0");
        expect(li3.attributes["data-index"].nodeValue).toBe("1");
        expect(li4.attributes["data-index"].nodeValue).toBe("2");
      });
    });

    describe("Item before and after (many)", () => {
      test("Should output list of elements", () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const content = node("ul", null, [
          node("li"),
          node("li"),
          node("li"),
          node(
            "li",
            { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
            "{_x}"
          ),
          node("li"),
          node("li"),
          node("li"),
        ]);

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: ul } = document.body;
        expect(ul.children.length).toBe(9);
        const [, , , li4, li5, li6] = ul.children;
        expect(li4.textContent).toBe(testData[0]);
        expect(li5.textContent).toBe(testData[1]);
        expect(li6.textContent).toBe(testData[2]);
        expect(li4.attributes["data-index"].nodeValue).toBe("0");
        expect(li5.attributes["data-index"].nodeValue).toBe("1");
        expect(li6.attributes["data-index"].nodeValue).toBe("2");
      });
    });
  });
});
