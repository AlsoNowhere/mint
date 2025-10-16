const { app, component, node, mFor, Resolver } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - Binding values", () => {
  afterEach(clearApp);

  describe("When binding literally", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testValue = "Example";
      const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
      const rootElement = document.body;
      const rootScope = { list: testData };
      const Basic = component("div", null, null, "{test}");
      const content = node("div", null, node(Basic, { mFor: mFor("list"), mKey: "_i", test: testValue }));

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testValue);
      expect(div2.textContent).toBe(testValue);
      expect(div3.textContent).toBe(testValue);
    });
  });

  describe("When binding via reference of parent data", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testValue = "Example";
      const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
      const rootElement = document.body;
      const rootScope = { list: testData, testValue };
      const Basic = component("div", null, null, "{test}");
      const content = node("div", null, node(Basic, { mFor: mFor("list"), mKey: "_i", "[test]": "testValue" }));

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testValue);
      expect(div2.textContent).toBe(testValue);
      expect(div3.textContent).toBe(testValue);
    });
  });

  describe("When binding via reference of data using Resolver", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testValue = "Example";
      const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
      const rootElement = document.body;
      const rootScope = {};
      const Basic = component("div", null, null, "{test}");
      const Main = component(
        "<>",
        function () {
          this.list = testData;
          this.testValue = new Resolver(() => testValue);
        },
        null,
        node(Basic, { mFor: mFor("list"), mKey: "_i", "[test]": "testValue" }),
      );
      const content = node("div", null, node(Main));

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testValue);
      expect(div2.textContent).toBe(testValue);
      expect(div3.textContent).toBe(testValue);
    });
  });

  describe("When binding via reference of Component data using Resolver and referencing scope data", () => {
    test("Should output list of elements", () => {
      // ** Arrange
      const testValue = "Example";
      const testData = ["One", "Two", "Three"].map((x) => ({ value: x }));
      const rootElement = document.body;
      const rootScope = {};
      const Basic = component("div", null, null, "{test}");
      const Main = component(
        "<>",
        function () {
          this.list = testData;
          this.testValue = new Resolver(function () {
            return `${this._x} ${this._i}`;
          });
        },
        null,
        node(Basic, { mFor: mFor("list"), mKey: "_i", "[test]": "testValue" }),
      );
      const content = node("div", null, node(Main));

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const { lastChild: div } = document.body;
      expect(div.children.length).toBe(3);
      const [div1, div2, div3] = div.children;
      expect(div1.textContent).toBe(testData[0] + " 0");
      expect(div2.textContent).toBe(testData[1] + " 1");
      expect(div3.textContent).toBe(testData[2] + " 2");
    });
  });
});
