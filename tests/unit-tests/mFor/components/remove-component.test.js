const { app, component, node, mFor, refresh, span } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - Remove Component", () => {
  afterEach(clearApp);

  describe("When a simple list of strings", () => {
    describe("When element is defined", () => {
      test("Should remove the Component", () => {
        // ** Arrange
        const testData = ["One", "Two"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const Basic = component("div", null, null, span("{_x}"));
        const content = node("div", null, node(Basic, { mFor: mFor("list"), mKey: "_i" }));

        // ** Act
        const { scope } = app(rootElement, rootScope, content);

        // ** Assert
        {
          const { lastChild: div } = document.body;
          const [div1, div2] = div.children;
          expect(div.children.length).toBe(2);
          expect(div1.textContent).toBe(testData[0]);
          expect(div1.nodeName).toBe("DIV");
          expect(div2.textContent).toBe(testData[1]);
          expect(div2.nodeName).toBe("DIV");
        }

        // ** Act
        testData.splice(1, 1);
        refresh(scope);

        // ** Assert
        {
          const { lastChild: div } = document.body;
          const [div1] = div.children;
          expect(div.children.length).toBe(1);
          expect(div1.textContent).toBe(testData[0]);
        }
      });
    });

    describe("When Component is a Fragment", () => {
      test("Should output list of elements", () => {
        // ** Arrange
        const testData = ["One", "Two"];
        const rootElement = document.body;
        const rootScope = { list: testData };
        const Basic = component("<>", null, null, span("{_x}"));
        const content = node("div", null, node(Basic, { mFor: mFor("list"), mKey: "_i" }));

        // ** Act
        const { scope } = app(rootElement, rootScope, content);

        // ** Assert
        {
          const { lastChild: div } = document.body;
          const [div1, div2] = div.children;
          expect(div.children.length).toBe(2);
          expect(div1.textContent).toBe(testData[0]);
          expect(div1.nodeName).toBe("SPAN");
          expect(div2.textContent).toBe(testData[1]);
          expect(div2.nodeName).toBe("SPAN");
        }

        // ** Act
        testData.splice(1, 1);
        refresh(scope);

        // ** Assert
        {
          const { lastChild: div } = document.body;
          const [div1] = div.children;
          expect(div.children.length).toBe(1);
          expect(div1.textContent).toBe(testData[0]);
          expect(div1.nodeName).toBe("SPAN");
        }
      });
    });
  });
});
