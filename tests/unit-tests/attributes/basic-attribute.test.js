const { app, node } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Basic Attribute", () => {
  afterEach(clearApp);

  describe("Add class attribute", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const class1 = "relative";
      const class2 = "width";
      const classValue = `${class1} ${class2}`;
      const content = node("div", { class: classValue });

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      const [div] = document.body.children;
      expect(div.classList.contains(class1)).toBe(true);
      expect(div.classList.contains(class2)).toBe(true);
    });
  });

  describe("Add style attribute", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const style1 = ["background", "pink"];
      const style2 = ["width", "100%"];
      const styles = `${style1[0]}: ${style1[1]}; ${style2[0]}: ${style2[1]};`;
      const content = node("div", { style: styles });

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      const [div] = document.body.children;
      expect(div.style[style1[0]]).toBe(style1[1]);
      expect(div.style[style2[0]]).toBe(style2[1]);
    });
  });

  describe("Add type attribute to button", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const type = "button";
      const content = node("button", { type: type });

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      const [button] = document.body.children;
      expect(button.type).toBe(type);
    });
  });

  describe("Add type attribute to input", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const type = "number";
      const content = node("input", { type: type });

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      const [input] = document.body.children;
      expect(input.type).toBe(type);
    });
  });

  describe("Add new attribute", () => {
    test("Should add the attribute", () => {
      // ** Arrange
      const testValue = "test value";
      const content = node("div", { "data-attr": testValue });

      // ** Act
      app(document.body, {}, content);

      // ** Assert
      const [div] = document.body.children;
      expect(div.attributes["data-attr"].nodeValue).toBe(testValue);
    });
  });
});
