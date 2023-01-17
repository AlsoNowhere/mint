const mint = require("../../dist/mint-test");

const { app, element } = mint;

const content1 = "One";
const content2 = "Two";
const list = ["1", "2"];

describe("mIf - when working with mFor", () => {
  describe("when an m-if is between and m-for", () => {
    test("Should render the m-if in the correct place", () => {
      const Main = component(
        "main",
        function () {
          this.case = false;
          this.list = list;
          this.update = function () {
            this.case = !this.case;
            refresh(this);
          };
        },
        null,
        [
          element("button", { type: "button", "(click)": "update" }, "Update"),
          element("p", null, content1),
          element("p", { "m-if": "case" }, content2),
          element("p", { "m-for": "list", "m-key": "_x" }, "{_x}"),
        ]
      );

      app(document.body, {}, element(Main));

      expect(document.body.children.length).toBe(5);

      const [button, p1, p2, p3, p4] = document.body.children;

      button.dispatchEvent(new Event("click"));

      setTimeout(() => {
        expect(p1.textContent).toBe(content1);
        expect(p2.textContent).toBe(content2);
        expect(p3.textContent).toBe(list[0]);
        expect(p4.textContent).toBe(list[1]);
      }, 0);
    });
  });
});
