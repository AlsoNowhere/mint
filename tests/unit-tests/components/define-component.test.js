const { component, mIf, mFor } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Define a Component", () => {
  afterEach(clearApp);

  describe("When Component is a Fragment", () => {
    describe("When content is a string", () => {
      test("Should error", () => {
        // ** Arrange
        const act = () => {
          component("<>", null, null, "content");
        };

        // ** Assert
        expect(act).toThrow(
          "MINT ERROR -- Cannot define content as 'string' when Component is a Fragment (<>)."
        );
      });
    });
  });

  describe("When mIf is in Component attributes", () => {
    test("Should error", () => {
      // ** Arrange
      const act = () => {
        component("div", null, { mIf: mIf("test") }, "content");
      };

      // ** Assert
      expect(act).toThrow(
        "MINT ERROR -- Cannot add mIf directly to Components attribute in Component definition."
      );
    });
  });

  describe("When mFor is in Component attributes", () => {
    test("Should error", () => {
      // ** Arrange
      const act = () => {
        component("div", null, { mFor: mFor("test") }, "content");
      };

      // ** Assert
      expect(act).toThrow(
        "MINT ERROR -- Cannot add mFor directly to Components attribute in Component definition."
      );
    });
  });
});
