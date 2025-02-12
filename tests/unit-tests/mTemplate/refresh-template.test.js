const { app, node, template, refresh } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mTemplate - conditionedBy", () => {
  afterEach(clearApp);

  describe("Refresh", () => {
    describe("When state has not changed", () => {
      test("Should add a reference to the Node", () => {
        // ** Arrange
        let state = 1;
        const testData = {
          state,
        };

        const dynamicContent = template({ conditionedBy: "state" }, () =>
          node("div", null, `Content from template ${state}`)
        );

        const content = node("div", null, [
          node("div", null, "The first"),
          node(dynamicContent),
        ]);

        // ** Act
        const { scope, rootScope } = app(document.body, testData, content);
        const { lastChild: div } = document.body;
        const [, firstDiv] = div.children;
        state = 1;
        rootScope.state = state;
        refresh(scope);

        // ** Assert
        const [, secondDiv] = div.children;
        expect(firstDiv).toBe(secondDiv);
      });
    });

    describe("When state has changed", () => {
      test("Should add a reference to the Node", () => {
        // ** Arrange
        let state = 1;
        const testData = {
          state,
        };

        const dynamicContent = template({ conditionedBy: "state" }, () =>
          node("div", null, `Content from template ${state}`)
        );

        const content = node("div", null, [
          node("div", null, "The first"),
          node(dynamicContent),
        ]);

        // ** Act
        const { scope, rootScope } = app(document.body, testData, content);
        const { lastChild: div } = document.body;
        const [, firstDiv] = div.children;
        state = 2;
        rootScope.state = state;
        refresh(scope);

        // ** Assert
        const [, secondDiv] = div.children;
        expect(firstDiv).not.toBe(secondDiv);
        expect(secondDiv.textContent).toBe(`Content from template ${state}`);
      });
    });

    describe("When default value", () => {
      test("Generated content should update each time", () => {
        // ** Arrange
        let state = 1;
        const testData = { state };

        const dynamicContent = template(() =>
          node("div", null, `Content from template ${state}`)
        );

        const content = node("div", null, [
          node("div", null, "The first"),
          node(dynamicContent),
        ]);

        // ** Act
        const { scope, rootScope } = app(document.body, testData, content);
        const { lastChild: div } = document.body;
        const [, firstDiv] = div.children;
        state = 2;
        // rootScope.state = state;
        refresh(scope);

        // ** Assert
        const [, secondDiv] = div.children;
        expect(firstDiv).not.toBe(secondDiv);
        expect(secondDiv.textContent).toBe(`Content from template ${state}`);
      });
    });
  });
});
