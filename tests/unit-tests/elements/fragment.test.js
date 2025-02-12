const { app, node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Create a Mint Fragment", () => {
  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  afterEach(clearApp);

  describe("When no content defined", () => {
    test("Should create nothing", () => {
      // ** Act
      app(document.body, {}, node("<>"));

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).toBe(null);
    });
  });

  describe("When defining attributes only", () => {
    test("Should create nothing", () => {
      // ** Act
      app(document.body, {}, node("<>", { class: "test" }));

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).toBe(null);
      expect(consoleWarnMock).toHaveBeenCalledWith(
        `MINT WARN -- Defining a Fragment with attributes i.e node("<>", { class }) means these attributes will be ignored on render.`
      );
    });
  });

  describe("When defining content", () => {
    test("Should create one layer of content", () => {
      // ** Act
      app(document.body, {}, node("<>", null, node("div")));

      // ** Assert
      const { lastChild } = document.body;
      expect(lastChild).not.toBe(null);
      expect(lastChild.nodeName).toBe("DIV");
    });
  });
});
