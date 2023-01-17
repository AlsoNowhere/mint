const mint = require("../../dist/mint-test");

const { app, element } = mint;

const value1 = "Something to consider";
const value2 = "thinking about";

describe("mIf - when true", () => {
  test("Should not remove element", () => {
    app(
      document.body,
      {
        value1,
        value2,
      },

      element("div", null, "{value1} and then I am {value2}")
    );

    const [div] = document.body.children;

    expect(div.textContent).toBe(`${value1} and then I am ${value2}`);
  });
});
