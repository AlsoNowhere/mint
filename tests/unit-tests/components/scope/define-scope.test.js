const {
  app,
  component,
  MintScope,
  node,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Create a basic Component", () => {
  afterEach(clearApp);

  describe("Content is just text", () => {
    // ** Arrange
    const content = "Plum";

    describe("Scope is a Function", () => {
      test("Should create and add the Component", () => {
        // ** Arrange
        const Basic = component("div", function () {}, null, content);

        // ** Act
        app(document.body, {}, node(Basic));
        const [div] = document.body.children;

        // ** Assert
        expect(div).not.toBe(undefined);
        expect(div.nodeName).toBe("DIV");
        expect(div.textContent).toBe(content);
      });
    });

    describe("Scope is null", () => {
      test("Should create and add the Component", () => {
        // ** Arrange
        const Basic = component("div", null, null, content);

        // ** Act
        app(document.body, {}, node(Basic));
        const [div] = document.body.children;

        // ** Assert
        expect(div).not.toBe(undefined);
        expect(div.nodeName).toBe("DIV");
        expect(div.textContent).toBe(content);
      });
    });

    describe("Scope is a class", () => {
      test("Should create and add the Component", () => {
        // ** Arrange
        class BasicComponent extends MintScope {
          constructor() {
            super();
          }
        }
        const Basic = component("div", BasicComponent, null, content);

        // ** Act
        app(document.body, {}, node(Basic));
        const [div] = document.body.children;

        // ** Assert
        expect(div).not.toBe(undefined);
        expect(div.nodeName).toBe("DIV");
        expect(div.textContent).toBe(content);
      });
    });
  });
});
