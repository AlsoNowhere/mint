const { app, component, node, refresh } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Storylines - Forms", () => {
  afterEach(clearApp);

  describe("Adding autocomplete when also adding (submit)", () => {
    describe("When autocomplete is first", () => {
      test("Should add autocomplete attribute", () => {
        // ** Arrange

        // ** Act
        app(
          document.body,
          {
            onSubmit() {},
          },
          node("form", { autocomplete: "off", "(submit)": "onSubmit" })
        );

        // ** Assert
        const { lastChild } = document.body;
        expect(lastChild.nodeName).toBe("FORM");
        const attribute = lastChild.attributes["autocomplete"];
        expect(attribute).not.toBe("undefined");
        expect(attribute.nodeValue).toBe("off");
      });
    });

    describe("When autocomplete is last", () => {
      test("Should add autocomplete attribute", () => {
        // ** Arrange

        // ** Act
        app(
          document.body,
          {
            onSubmit() {},
          },
          node("form", { "(submit)": "onSubmit", autocomplete: "off" })
        );

        // ** Assert
        const { lastChild } = document.body;
        expect(lastChild.nodeName).toBe("FORM");
        const attribute = lastChild.attributes["autocomplete"];
        expect(attribute).not.toBe("undefined");
        expect(attribute.nodeValue).toBe("off");
      });
    });
  });
});
