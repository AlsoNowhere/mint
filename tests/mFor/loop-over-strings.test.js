const mint = require("../../dist/mint-test");

const { app, element, component, refresh } = mint;

describe("mFor -- strings", () => {
  const rootData = ["One", "Two", "Three"];
  const Main = component(
    "main",
    function () {
      this.list = [...rootData];
      this.remove = function () {
        this.list.splice(1, 1);
        refresh(this);
      };
      this.add = function () {
        this.list.splice(1, 0, "Four");
        refresh(this);
      };
    },
    null,
    [
      element("div", { "m-for": "list", "m-key": "_x" }, "{_x}"),
      element(
        "button",
        { type: "button", "(click)": "remove" },
        "Button remove"
      ),
      element("button", { type: "button", "(click)": "add" }, "Button add"),
    ]
  );

  test("Should output list of elements", () => {
    app(document.body, {}, element(Main));
    const [main] = document.body.children;
    expect(main.children.length).toBe(5);
    const [div1, div2, div3, button1, button2] = main.children;
    expect(div1.textContent).toBe(rootData[0]);
    expect(div2.textContent).toBe(rootData[1]);
    expect(div3.textContent).toBe(rootData[2]);
    expect(button1.textContent).toBe("Button remove");
    expect(button2.textContent).toBe("Button add");
  });

  test("Should remove an item from the middle", () => {
    app(document.body, {}, element(Main));
    const [main] = document.body.children;
    const [div1, div3, button1, button2] = main.children;
    button1.dispatchEvent(new Event("click"));
    setTimeout(() => {
      expect(main.children.length).toBe(4);
      expect(div1.textContent).toBe(rootData[0]);
      expect(div3.textContent).toBe(rootData[2]);
      expect(button1.textContent).toBe("Button remove");
      expect(button2.textContent).toBe("Button add");
    }, 0);
  });

  test("Should add an item to the middle", () => {
    app(document.body, {}, element(Main));
    const [main] = document.body.children;
    const [div1, div3, button1, button2] = main.children;
    button2.dispatchEvent(new Event("click"));
    setTimeout(() => {
      expect(main.children.length).toBe(6);
      expect(div1.textContent).toBe(rootData[0]);
      expect(div3.textContent).toBe(rootData[2]);
      expect(button1.textContent).toBe("Button remove");
      expect(button2.textContent).toBe("Button add");
    }, 0);
  });
});
