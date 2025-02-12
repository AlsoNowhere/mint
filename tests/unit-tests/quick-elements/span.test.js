const { node, span } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Create a span from span()", () => {
  afterEach(clearApp);

  describe("attributes first", () => {
    test("Should create a span", () => {
      // ** Arrange
      const attributes = { class: "some" };
      const content = "Something";

      // ** Act
      const result1 = span(attributes, content);
      const result2 = node("span", attributes, content);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
      expect(result1.content.length).toBe(result2.content.length);
    });
  });

  describe("content only", () => {
    test("Should create a span", () => {
      // ** Arrange
      const content = "Something";

      // ** Act
      const result1 = span(content);
      const result2 = node("span", null, content);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
      expect(result1.content.length).toBe(result2.content.length);
    });
  });

  describe("attributes only", () => {
    test("Should create a span", () => {
      // ** Arrange
      const attributes = { class: "some" };

      // ** Act
      const result1 = span(attributes);
      const result2 = node("span", attributes);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
    });
  });
});
