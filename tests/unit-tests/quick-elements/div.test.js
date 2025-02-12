const { node, div } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Create a div from div()", () => {
  afterEach(clearApp);

  describe("attributes first", () => {
    test("Should create a div", () => {
      // ** Arrange
      const attributes = { class: "some" };
      const content = "Something";

      // ** Act
      const result1 = div(attributes, content);
      const result2 = node("div", attributes, content);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
      expect(result1.content.length).toBe(result2.content.length);
    });
  });

  describe("content only", () => {
    test("Should create a div", () => {
      // ** Arrange
      const content = "Something";

      // ** Act
      const result1 = div(content);
      const result2 = node("div", null, content);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
      expect(result1.content.length).toBe(result2.content.length);
    });
  });

  describe("attributes only", () => {
    test("Should create a div", () => {
      // ** Arrange
      const attributes = { class: "some" };

      // ** Act
      const result1 = div(attributes);
      const result2 = node("div", attributes);

      // ** Assert
      expect(result1.mintNode.element).toBe(result2.mintNode.element);
      expect(result1.properties).toBe(result2.properties);
    });
  });
});
