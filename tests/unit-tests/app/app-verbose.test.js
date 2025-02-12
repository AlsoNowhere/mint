const { app } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Mount an app", () => {
  afterEach(clearApp);

  describe("When data is basic", () => {
    test("Should run the app function without erroring", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = {};
        const content = "";

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).not.toThrow();
    });
  });

  describe("When missing root element", () => {
    test("Should throw caught error", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = undefined;
        const rootScope = {};
        const content = "";

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).toThrow(
        "app -- rootElement -- You must pass a HTMLElement for the rootElement."
      );
    });
  });

  describe("When rootScope is 'null'", () => {
    test("Should throw caught error", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = null;
        const content = "";

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).toThrow(
        "app -- rootScope -- Cannot pass null as root scope. Root scope is defined against generic T as can't autofill from null."
      );
    });
  });

  describe("When rootScope is 'undefined'", () => {
    test("Should throw caught error", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = undefined;
        const content = "";

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).toThrow("app -- rootScope -- Value not Object.");
    });
  });

  describe("When content is 'undefined'", () => {
    test("Should throw caught error", () => {
      const runTest = () => {
        // ** Arrange
        const rootElement = document.body;
        const rootScope = {};
        const content = undefined;

        // ** Act
        app(rootElement, rootScope, content);
      };

      // ** Assert
      expect(runTest).toThrow("app -- content -- Must be string or Array.");
    });
  });
});
