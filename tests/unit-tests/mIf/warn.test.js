const { app, node, mIf } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("mIf - Warn", () => {
  afterEach(clearApp);

  describe("When value has space", () => {
    const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();

    afterEach(() => {
      consoleWarnMock.mockRestore();
    });

    test("Should give the user a warning", () => {
      // ** Arrange

      const content = node("div", { mIf: mIf("ca se") }, "Content");

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      expect(consoleWarnMock).toHaveBeenCalledWith(
        `MINT WARN -- mIf value defined with a space, this may be a mistake. Value: "ca se".`
      );
    });
  });
});
