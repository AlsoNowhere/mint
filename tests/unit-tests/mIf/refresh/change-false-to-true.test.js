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

  describe("From false to true", () => {
    describe("Element", () => {
      test("Should add the element on refresh", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: false };
        const content = node("div", { mIf: mIf("case") }, "Content");

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        const divs = rootElement.querySelector("div");
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        expect(divs).toBe(null);
        const { lastChild: div } = document.body;
        expect(div).not.toBe(undefined);
        expect(div.attributes.mIf).toBe(undefined);
      });
    });

    describe("Component", () => {
      test("Should add the element on refresh", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: false };
        const BasicComponent = component("div", null, null, "Content");
        const content = node(BasicComponent, { mIf: mIf("case") });

        // ** Act
        const { scope, rootScope } = app(rootElement, testData, content);
        const divs = rootElement.querySelector("div");
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        expect(divs).toBe(null);
        const { lastChild: div } = document.body;
        expect(div).not.toBe(undefined);
        expect(div.attributes.mIf).toBe(undefined);
      });
    });
  });
});
