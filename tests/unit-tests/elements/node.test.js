const { node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Create a Mint Element", () => {
  afterEach(clearApp);

  describe("Div", () => {
    describe("basic Div", () => {
      test("Should create a div", () => {
        // ** Arrange
        const element = "div";

        // ** Act
        const result = node(element);

        // ** Assert
        expect(result.mintNode.element).toBe("div");
        expect(result.props).toBe(null);
        expect(result.content.length).toBe(0);
      });
    });

    describe("simple content", () => {
      test("Should create a div", () => {
        // ** Arrange
        const testValue = "test value";
        const element = "div";
        const content = testValue;

        // ** Act
        const result = node(element, null, content);

        // ** Assert
        expect(result.mintNode.element).toBe("div");
        expect(result.content.length).toBe(1);
      });
    });

    describe("content in array", () => {
      test("Should create a div", () => {
        // ** Arrange
        const testValue = "test value";
        const element = "div";
        const content = [testValue];

        // ** Act
        const result = node(element, null, content);

        // ** Assert
        expect(result.mintNode.element).toBe("div");
        expect(result.content.length).toBe(1);
      });
    });

    describe("multi content", () => {
      test("Should create a div", () => {
        // ** Arrange
        const testValue = "test value";
        const element = "div";
        const content = [testValue, testValue];

        // ** Act
        const result = node(element, null, content);

        // ** Assert
        expect(result.mintNode.element).toBe("div");
        expect(result.content.length).toBe(2);
      });
    });

    describe("have a Div as a child", () => {
      test("Should create a div as a child of the div", () => {
        // ** Arrange
        const element = "div";

        // ** Act
        const result = node(element, null, node(element));

        // ** Assert
        expect(result.mintNode.element).toBe("div");
        expect(result.content.length).toBe(1);
        expect(result.content[0].mintNode.element).toBe("div");
      });
    });
  });
});
