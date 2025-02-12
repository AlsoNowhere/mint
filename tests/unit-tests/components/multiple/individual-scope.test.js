const { app, component, node, mIf } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Two Components creation - props", () => {
  afterEach(clearApp);

  describe("Each Component has a unique scope, cloned from the original Component", () => {
    test("Should create individual scope", () => {
      // ** Arrange
      const test1 = "Test 1",
        test2 = "Test 2";
      const Basic = component("div", null, null, [
        node("p", { mIf: mIf("case1") }, `{name} ${test1}`),
        node("p", { mIf: mIf("case2") }, `{name} ${test2}`),
      ]);

      // ** Act
      app(
        document.body,
        {},
        node("div", null, [
          node(Basic, { name: "Test one", case1: true, case2: false }),
          node(Basic, { name: "Test two", case1: false, case2: true }),
        ])
      );

      // ** Assert
      const { lastChild: div } = document.body;
      const [component1Div, component2Div] = div.children;
      {
        const [p1, p2] = component1Div.children;
        expect(p1.textContent).toBe(`Test one ${test1}`);
        expect(p2).toBe(undefined);
      }
      {
        const [p1, p2] = component2Div.children;
        expect(p1.textContent).toBe(`Test two ${test2}`);
        expect(p2).toBe(undefined);
      }
    });
  });
});
