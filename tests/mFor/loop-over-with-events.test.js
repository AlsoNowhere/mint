const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("mFor -- events", () => {
  test("Should add events", () => {
    const test = jest.fn();
    const data = {
      list: ["One", "Two"],
      run() {
        test();
      },
    };
    app(
      document.body,
      data,
      element(
        "div",
        { "m-for": "list", "m-key": "_i", "(click)": "run" },
        "{_x}"
      )
    );
    const [div1, div2] = document.body.children;
    expect(div1.innerText).toBe(data[0]);
    expect(div2.innerText).toBe(data[1]);

    div1.dispatchEvent(new Event("click"));

    expect(test).toHaveBeenCalled();
  });
});
