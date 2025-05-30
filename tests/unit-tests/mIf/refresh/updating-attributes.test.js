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
    describe("Attributes", () => {
      test("Should render the attributes", () => {
        // ** Arrange
        const rootElement = document.body;
        const testData = { case: false };
        const content = node(
          "div",
          { mIf: mIf("case"), class: "some" },
          "Content"
        );

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
