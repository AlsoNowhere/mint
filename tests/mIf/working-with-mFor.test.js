const mint = require("../../dist/mint-test");

const { app, element, component, refresh } = mint;

const content1 = "One";
const content2 = "Two";
const list = ["1", "2"];
const update = function () {
  this.case = true;
  refresh(this);
};
const childs = [
  element("button", { type: "button", "(click)": "update" }, "Update"),
  element("p", null, content1),
  element("p", { "m-if": "case" }, content2),
  element("p", { "m-for": "list", "m-key": "_x" }, "{_x}"),
];

describe("mIf - when working with mFor", () => {
  describe("when an m-if is between and m-for", () => {
    beforeEach(() => {
      [...document.body.children].forEach((x) => document.body.removeChild(x));
    });

    describe("when case is true", () => {
      const Main = component(
        "main",
        function () {
          this.list = list;
          this.case = true;
        },
        null,
        childs
      );

      test("Should render in the correct place", () => {
        app(document.body, {}, element(Main));
        const [main] = document.body.children;
        expect(main.children.length).toBe(5);
        const [, p1, p2, p3, p4] = main.children;
        expect(p1.textContent).toBe(content1);
        expect(p2.textContent).toBe(content2);
        expect(p3.textContent).toBe(list[0]);
        expect(p4.textContent).toBe(list[1]);
      });
    });

    describe("when case is false", () => {
      const Main = component(
        "main",
        function () {
          this.list = list;
          this.case = false;
        },
        null,
        childs
      );

      test("Should not render mIf", () => {
        app(document.body, {}, element(Main));
        const [main] = document.body.children;
        expect(main.children.length).toBe(4);
      });
    });

    describe("when case is changed", () => {
      const Main = component(
        "main",
        function () {
          this.list = list;
          this.case = false;
          this.update = update;
        },
        null,
        childs
      );

      test("Should render mIf", (done) => {
        app(document.body, {}, element(Main));
        const [main] = document.body.children;
        expect(main.children.length).toBe(4);
        const [button] = main.children;
        button.dispatchEvent(new Event("click"));
        setTimeout(() => {
          const [, p1, p2, p3, p4] = main.children;
          expect(p1.textContent).toBe(content1);
          expect(p2.textContent).toBe(content2);
          expect(p3.textContent).toBe(list[0]);
          expect(p4.textContent).toBe(list[1]);
          done();
        }, 0);
      });
    });
  });
});
