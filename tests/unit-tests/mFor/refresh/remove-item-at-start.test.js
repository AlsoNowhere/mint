const { app, node, refresh, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Refresh", () => {
  afterEach(clearApp);

  describe("Remove item at start", () => {
    describe("When a simple list of strings", () => {
      test("Should remove item at start", () => {
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
        const { scope } = app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = document.body;
        expect(div.children.length).toBe(3);
        let [div1, div2, div3] = div.children;
        expect(div1.textContent).toBe(testData[0]);
        expect(div2.textContent).toBe(testData[1]);
        expect(div3.textContent).toBe(testData[2]);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
        expect(div3.attributes["data-index"].nodeValue).toBe("2");

        // ** Act
        testData.shift();
        refresh(scope);

        // ** Assert
        expect(div.children.length).toBe(2);
        [div1, div2] = div.children;
        expect(div1.textContent).toBe(testData[0]);
        expect(div2.textContent).toBe(testData[1]);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
      });
    });

    describe("When a list of objects", () => {
      test("Should remove item at start", () => {
        // ** Arrange
        const testData = [
          { value: "One" },
          { value: "Two" },
          { value: "Three" },
        ];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const content = node(
          "div",
          null,
          node(
            "div",
            { mFor: mFor("list"), mKey: "_i", "[data-index]": "_i" },
            "{value}"
          )
        );

        // ** Act
        const { scope } = app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild: div } = document.body;
        expect(div.children.length).toBe(3);
        let [div1, div2, div3] = div.children;
        expect(div1.textContent).toBe(testData[0].value);
        expect(div2.textContent).toBe(testData[1].value);
        expect(div3.textContent).toBe(testData[2].value);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
        expect(div3.attributes["data-index"].nodeValue).toBe("2");

        // ** Act
        testData.shift();
        refresh(scope);

        // ** Assert
        expect(div.children.length).toBe(2);
        [div1, div2] = div.children;
        expect(div1.textContent).toBe(testData[0].value);
        expect(div2.textContent).toBe(testData[1].value);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
      });
    });
  });
});
