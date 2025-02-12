const { app, node, refresh, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Refresh", () => {
  afterEach(clearApp);

  describe("Add item to end", () => {
    describe("When a simple list of strings", () => {
      test("Should add item to end", () => {
        // ** Arrange
        const testData = ["One", "Two", "Three"];
        const newValue = "Melon";
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
        testData.push(newValue);
        refresh(scope);

        // ** Assert
        expect(div.children.length).toBe(4);
        [div1, div2, div3, div4] = div.children;
        expect(div1.textContent).toBe(testData[0]);
        expect(div2.textContent).toBe(testData[1]);
        expect(div3.textContent).toBe(testData[2]);
        expect(div4.textContent).toBe(newValue);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
        expect(div3.attributes["data-index"].nodeValue).toBe("2");
        expect(div4.attributes["data-index"].nodeValue).toBe("3");
      });
    });

    describe("When a list of objects", () => {
      test("Should add item to start", () => {
        // ** Arrange
        const testData = [
          { value: "One" },
          { value: "Two" },
          { value: "Three" },
        ];
        const newValue = { value: "Melon" };
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
        testData.push(newValue);
        refresh(scope);

        // ** Assert
        expect(div.children.length).toBe(4);
        [div1, div2, div3, div4] = div.children;
        expect(div1.textContent).toBe(testData[0].value);
        expect(div2.textContent).toBe(testData[1].value);
        expect(div3.textContent).toBe(testData[2].value);
        expect(div4.textContent).toBe(newValue.value);
        expect(div1.attributes["data-index"].nodeValue).toBe("0");
        expect(div2.attributes["data-index"].nodeValue).toBe("1");
        expect(div3.attributes["data-index"].nodeValue).toBe("2");
        expect(div4.attributes["data-index"].nodeValue).toBe("3");
      });
    });
  });
});
