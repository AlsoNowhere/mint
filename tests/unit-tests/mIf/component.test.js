const { app, component, node, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mIf - Components", () => {
  afterEach(clearApp);

  describe("When value is true", () => {
    test("Should retain the element", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = { case: true };
      const BasicComponent = component("div", null, null, "Content");
      const content = node(BasicComponent, { mIf: mIf("case") });

      // ** Act
      app(rootElement, rootScope, content);

      const { lastChild: div } = document.body;
      expect(div).not.toBe(undefined);
      expect(div.attributes.mIf).toBe(undefined);
    });
  });

  describe("When value is false", () => {
    test("Should not add the element", () => {
      // ** Arrange
      const rootElement = document.body;
      const rootScope = { case: false };
      const BasicComponent = component("div", null, null, "Content");
      const content = node(BasicComponent, { mIf: mIf("case") });

      // ** Act
      app(rootElement, rootScope, content);

      // ** Assert
      const divs = rootElement.querySelector("div");
      expect(divs).toBe(null);
    });
  });

  describe("Cannot add mIf to Component attributes definitions", () => {
    test("Should error as appropriate", () => {
      const run = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: true };
        const BasicComponent = component(
          "div",
          null,
          { mIf: mIf("case") },
          "Content"
        );
        const content = node(BasicComponent);

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(run).toThrow(
        "MINT ERROR -- Cannot add mIf directly to Components attribute in Component definition."
      );
    });
  });

  describe("When defined on props and attributes", () => {
    test("Should error", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = { case: true };
        const BasicComponent = component(
          "div",
          null,
          { mIf: mIf("case") },
          "Content"
        );
        const content = node(BasicComponent, { mIf: mIf("case") });

        // ** Act
        app(rootElement, rootScope, content);
      };

      expect(runTest).toThrow(
        "MINT ERROR -- Cannot add mIf directly to Components attribute in Component definition."
      );
    });
  });
});
