const mint = require("../../../dist/mint-test");

const { app, component, element } = mint;

const BasicComponent = component(
  "div",
  function () {},
  null,
  "Component prop - {test}"
);

describe("String prop component", () => {
  test("Passed props should change values on passed Component", () => {
    app(document.body, {}, element(BasicComponent, { test: "Lemon" }));
    const [div] = document.body.children;
    expect(div.textContent).toBe("Component prop - Lemon");
  });
});
