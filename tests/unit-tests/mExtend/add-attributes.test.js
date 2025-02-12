const { app, node, mExtend } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mExtend", () => {
  afterEach(clearApp);

  describe("Define an object which extends attributes", () => {
    describe("When using a string reference on scope", () => {
      test("Should add attributes from object", () => {
        // ** Arrange
        const rootElement = document.body;
        const testClass = "lemon";
        const rootScope = { obj: { class: testClass } };
        const content = node("div", { mExtend: mExtend("obj") });

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild } = rootElement;
        expect(lastChild.classList.contains(testClass)).toBe(true);
      });
    });

    describe("When using an object defined literally", () => {
      test("Should add attributes from object", () => {
        // ** Arrange
        const rootElement = document.body;
        const testClass = "lemon";
        const obj = { class: testClass };
        const rootScope = {};
        const content = node("div", { mExtend: mExtend(obj) });

        // ** Act
        app(rootElement, rootScope, content);

        // ** Assert
        const { lastChild } = rootElement;
        expect(lastChild.classList.contains(testClass)).toBe(true);
      });
    });
  });
});
