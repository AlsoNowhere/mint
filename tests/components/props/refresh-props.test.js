const mint = require("../../../dist/mint-test");

const { app, component, element, refresh } = mint;

const baseContent = "base";
const firstContent = "Lemon";
const secondContent = "Orange";

const Lemon = component(
  "div",
  function () {
    this.test = baseContent;
  },
  null,
  "Component prop - {test}"
);

const Main = component(
  "main",
  function () {
    this.test = firstContent;
    this.update = function () {
      this.test = secondContent;
      refresh(this);
    };
  },
  null,
  [
    element(Lemon, { "[test]": "test" }),
    element("button", { type: "button", "(click)": "update" }),
  ]
);

describe("Refreshing props on Component", () => {
  test("When a Component refreshes the props should update the values on the Component", (done) => {
    app(document.body, {}, element(Main));
    const [main] = document.body.children;
    const [div, button] = main.children;
    expect(div.textContent).toBe(`Component prop - ${firstContent}`);
    expect(div.textContent).not.toBe(`Component prop - ${baseContent}`);
    button.dispatchEvent(new Event("click"));
    setTimeout(() => {
      expect(div.textContent).toBe(`Component prop - ${secondContent}`);
      expect(div.textContent).not.toBe(`Component prop - ${firstContent}`);
      expect(div.textContent).not.toBe(`Component prop - ${baseContent}`);
      done();
    }, 0);
  });
});
