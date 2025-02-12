const { app, node, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mIf and Mint Fragments", () => {
  afterEach(clearApp);

  describe("when true", () => {
    test("Should create a div", () => {
      // ** Arrange
      // ** Act
      app(
        document.body,
        { case: true },
        node("<>", { mIf: mIf("case") }, node("div"))
      );

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).not.toBe(null);
      expect(lastChild.nodeName).toBe("DIV");
    });
  });

  describe("when false", () => {
    test("Should not create a div", () => {
      // ** Arrange
      // ** Act
      app(
        document.body,
        { case: false },
        node("<>", { mIf: mIf("case") }, node("div"))
      );

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).toBe(null);
    });
  });
});
