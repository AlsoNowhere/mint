const {
  app,
  node,
  component,
  resolvePropTypes,
} = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Prop types", () => {
  afterEach(clearApp);

  let consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();

  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  describe("Define a correct prop type", () => {
    test("Should not send a warning message", () => {
      // ** Arrange
      const Basic = component(
        "div",
        class BasicComponent {
          constructor() {
            this.value = "One";
          }
        },
        null,
        "Content: {value}"
      );
      Basic.propTypes = { value: ["string"] };

      // ** Act
      app(
        document.body,
        { rootValue: "Two" },
        node(Basic, { "[value]": "rootValue" }),
        { componentResolvers: [resolvePropTypes] }
      );

      // ** Assert
      expect(consoleWarnMock).not.toHaveBeenCalled();
    });
  });

  describe("Define a wrong prop type", () => {
    describe("Adding resolver to app", () => {
      test("Should send a warning message", () => {
        // ** Arrange
        const Basic = component(
          "div",
          class BasicComponent {
            constructor() {
              this.value = "One";
            }
          },
          null,
          "Content: {value}"
        );
        Basic.propTypes = { value: ["string"] };

        // ** Act
        app(
          document.body,
          { rootValue: 2 },
          node(Basic, { "[value]": "rootValue" }),
          { componentResolvers: [resolvePropTypes] }
        );

        // ** Assert
        expect(consoleWarnMock).toHaveBeenCalledWith(
          `MINT WARN -- Prop types clash. Component: BasicComponent. Prop: [value]. Incorrect type: number. Allowed types: "${Basic.propTypes.value.join(
            ", "
          )}"`
        );
      });
    });

    describe("Without adding resolver to app", () => {
      test("Should not send a warning message", () => {
        // ** Arrange
        const Basic = component(
          "div",
          class BasicComponent {
            constructor() {
              this.value = "One";
            }
          },
          null,
          "Content: {value}"
        );
        Basic.propTypes = { value: ["string"] };

        // ** Act
        app(
          document.body,
          { rootValue: 2 },
          node(Basic, { "[value]": "rootValue" })
        );

        // ** Assert
        expect(consoleWarnMock).not.toHaveBeenCalled();
      });
    });
  });
});
