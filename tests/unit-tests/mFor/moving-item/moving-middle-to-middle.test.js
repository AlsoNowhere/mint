const { app, node, refresh, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Move item", () => {
  afterEach(clearApp);

  describe("Take item from middle and put elsewhere in the middle", () => {
    describe("Move forward", () => {
      describe("When a simple list of strings", () => {
        test("Should move item", () => {
          // ** Arrange
          const testData = ["One", "Two", "Three", "Four", "Five"];
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
          expect(div.children.length).toBe(5);
          let [div1, div2, div3, div4, div5] = div.children;
          expect(div1.textContent).toBe(testData[0]);
          expect(div2.textContent).toBe(testData[1]);
          expect(div3.textContent).toBe(testData[2]);
          expect(div4.textContent).toBe(testData[3]);
          expect(div5.textContent).toBe(testData[4]);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");

          // ** Act
          const hold = testData[1];
          testData.splice(1, 1);
          testData.splice(2, 0, hold);
          refresh(scope);

          // ** Assert
          const referenceDiv = div2;
          expect(div.children.length).toBe(5);
          [div1, div2, div3, div4, div5] = div.children;
          expect(div4).not.toBe(referenceDiv);
          expect(div1.textContent).toBe(testData[0]);
          expect(div2.textContent).toBe(testData[1]);
          expect(div3.textContent).toBe(testData[2]);
          expect(div4.textContent).toBe(testData[3]);
          expect(div5.textContent).toBe(testData[4]);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");
        });
      });

      describe("When a list of objects", () => {
        test("Should move item", () => {
          // ** Arrange
          const testData = [
            { value: "One" },
            { value: "Two" },
            { value: "Three" },
            { value: "Four" },
            { value: "Five" },
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
          expect(div.children.length).toBe(5);
          let [div1, div2, div3, div4, div5] = div.children;
          expect(div1.textContent).toBe(testData[0].value);
          expect(div2.textContent).toBe(testData[1].value);
          expect(div3.textContent).toBe(testData[2].value);
          expect(div4.textContent).toBe(testData[3].value);
          expect(div5.textContent).toBe(testData[4].value);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");

          // ** Act
          const hold = testData[1];
          testData.splice(1, 1);
          testData.splice(2, 0, hold);
          refresh(scope);

          // ** Assert
          const referenceDiv = div2;
          expect(div.children.length).toBe(5);
          [div1, div2, div3, div4, div5] = div.children;
          expect(div4).not.toBe(referenceDiv);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");
        });
      });
    });

    describe("Move backward", () => {
      describe("When a simple list of strings", () => {
        test("Should move item", () => {
          // ** Arrange
          const testData = ["One", "Two", "Three", "Four", "Five"];
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
          expect(div.children.length).toBe(5);
          let [div1, div2, div3, div4, div5] = div.children;
          expect(div1.textContent).toBe(testData[0]);
          expect(div2.textContent).toBe(testData[1]);
          expect(div3.textContent).toBe(testData[2]);
          expect(div4.textContent).toBe(testData[3]);
          expect(div5.textContent).toBe(testData[4]);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");

          // ** Act
          const hold = testData[3];
          testData.splice(3, 1);
          testData.splice(1, 0, hold);
          refresh(scope);

          // ** Assert
          const referenceDiv = div4;
          expect(div.children.length).toBe(5);
          [div1, div2, div3, div4, div5] = div.children;
          expect(div2).not.toBe(referenceDiv);
          expect(div1.textContent).toBe(testData[0]);
          expect(div2.textContent).toBe(testData[1]);
          expect(div3.textContent).toBe(testData[2]);
          expect(div4.textContent).toBe(testData[3]);
          expect(div5.textContent).toBe(testData[4]);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");
        });
      });

      describe("When a list of objects", () => {
        test("Should move item", () => {
          // ** Arrange
          const testData = [
            { value: "One" },
            { value: "Two" },
            { value: "Three" },
            { value: "Four" },
            { value: "Five" },
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
          expect(div.children.length).toBe(5);
          let [div1, div2, div3, div4, div5] = div.children;
          expect(div1.textContent).toBe(testData[0].value);
          expect(div2.textContent).toBe(testData[1].value);
          expect(div3.textContent).toBe(testData[2].value);
          expect(div4.textContent).toBe(testData[3].value);
          expect(div5.textContent).toBe(testData[4].value);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");

          // ** Act
          const hold = testData[3];
          testData.splice(3, 1);
          testData.splice(1, 0, hold);
          refresh(scope);

          // ** Assert
          const referenceDiv = div4;
          expect(div.children.length).toBe(5);
          [div1, div2, div3, div4, div5] = div.children;
          expect(div2).not.toBe(referenceDiv);
          expect(div1.attributes["data-index"].nodeValue).toBe("0");
          expect(div2.attributes["data-index"].nodeValue).toBe("1");
          expect(div3.attributes["data-index"].nodeValue).toBe("2");
          expect(div4.attributes["data-index"].nodeValue).toBe("3");
          expect(div5.attributes["data-index"].nodeValue).toBe("4");
        });
      });
    });
  });
});
