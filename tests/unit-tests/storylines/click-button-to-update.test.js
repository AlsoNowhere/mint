const { app, component, node, refresh } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Storylines", () => {
  afterEach(clearApp);

  describe("Click button to update", () => {
    test("Should refresh on clicking button", (done) => {
      // ** Arrange
      const lemonContent = "base";
      const firstMainContent = "Lemon";
      const secondMainContent = "Orange";

      const Lemon = component(
        "div",
        function () {
          this.test = lemonContent;
        },
        null,
        "Component prop - {test}"
      );

      const Main = component(
        "main",
        function () {
          this.test = firstMainContent;
          this.update = function () {
            this.test = secondMainContent;
            refresh(this);
          };
        },
        null,
        [
          node(Lemon, { "[test]": "test" }),
          node("button", { type: "button", "(click)": "update" }),
        ]
      );

      // ** Act
      app(document.body, {}, node(Main));

      // ** Assert
      const [main] = document.body.children;
      const [div, button] = main.children;
      expect(div.textContent).toBe(`Component prop - ${firstMainContent}`);
      expect(div.textContent).not.toBe(`Component prop - ${lemonContent}`);
      button.dispatchEvent(new Event("click"));
      setTimeout(() => {
        expect(div.textContent).toBe(`Component prop - ${secondMainContent}`);
        expect(div.textContent).not.toBe(
          `Component prop - ${firstMainContent}`
        );
        expect(div.textContent).not.toBe(`Component prop - ${lemonContent}`);
        done();
      }, 0);
    });
  });
});
