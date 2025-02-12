const {
  app,
  component,
  node,
  mIf,
  refresh,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mIf - Change", () => {
  afterEach(clearApp);

  describe("From true to false", () => {
    describe("Element", () => {
      test("Should add then remove the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: true };
        const content = node("div", { mIf: mIf("case") }, "Content");

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        const { lastChild: div } = document.body;
        rootScope.case = false;
        refresh(scope);

        // ** Assert
        expect(div).not.toBe(undefined);
        expect(div.attributes.mIf).toBe(undefined);
        const divs = rootElement.querySelector("div");
        expect(divs).toBe(null);
      });
    });

    describe("Component", () => {
      test("Should add then remove the element", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: true };
        const BasicComponent = component("div", null, null, "Content");
        const content = node(BasicComponent, { mIf: mIf("case") });

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        const { lastChild: div } = document.body;
        rootScope.case = false;
        refresh(scope);

        // ** Assert
        expect(div).not.toBe(undefined);
        expect(div.attributes.mIf).toBe(undefined);
        const divs = rootElement.querySelector("div");
        expect(divs).toBe(null);
      });
    });
  });
});
