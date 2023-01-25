const mint = require("../../dist/mint-test");

const { app, component, element, MintComponent } = mint;

const content = "Plum";

class BasicComponent extends MintComponent {
  constructor() {
    super();
    this.test = content;
  }
}

const Basic = component("div", BasicComponent, null, "Component prop - {test}");

describe("Simple component", () => {
  test("Should not error", () => {
    app(document.body, {}, element(Basic));
    const [div] = document.body.children;
    expect(div.textContent).toBe(`Component prop - ${content}`);
  });
});
