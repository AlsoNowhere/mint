const { app, node, template, refresh } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mTemplate", () => {
  afterEach(clearApp);

  describe("Add content defined in a template", () => {
    test("Should add the content", () => {
      // ** Arrange
      let state = 1;
      const testData = {
        state,
      };

      const dynamicContent = template(() =>
        node("div", null, `Content from template ${state}`)
      );

      const content = node("div", null, [
        node("div", null, "The first"),
        node(dynamicContent),
      ]);

      // ** Act
      app(document.body, testData, content);
      const { lastChild: div } = document.body;
      const [, div2] = div.children;

      // ** Assert
      expect(div2.textContent).toBe(`Content from template ${state}`);
    });
  });

  describe("Define value in scope", () => {
    test("Should add the content", () => {
      // ** Arrange
      let state = 1;
      const dynamicContent = () =>
        node("div", null, `Content from template ${state}`);
      const testData = {
        state,
        dynamicContent,
      };

      const content = node("div", null, [
        node("div", null, "The first"),
        node(template("dynamicContent")),
      ]);

      // ** Act
      app(document.body, testData, content);
      const { lastChild: div } = document.body;
      const [, div2] = div.children;

      // ** Assert
      expect(div2.textContent).toBe(`Content from template ${state}`);
    });
  });
});
