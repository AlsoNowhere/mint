const mint = require("../../dist/mint-test");

const { app, element } = mint;

const value1 = "Something to consider";
const value2 = "thinking about";

describe("deBracer", () => {
  beforeEach(() => {
    [...document.body.children].forEach((x) => document.body.removeChild(x));
  });

  test("Should render string with scope values", () => {
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

  test("Should ignore skipped braces", () => {
    app(
      document.body,
      {
        value: "test",
      },
      element("div", null, "\\{value}")
    );

    const [div] = document.body.children;

    expect(div.textContent).toBe(`{value}`);
  });
});
