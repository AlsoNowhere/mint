const mint = require("../../dist/mint-test");

const { app, element } = mint;

xdescribe("mFor -- with siblings", () => {
  describe("When there are no siblings", () => {
    test("Should output list of elements", () => {
      const data = {
        list: ["One", "Two"],
      };
      app(document.body, data, [
        element("ul", { "#ref": null }, [
          element("div", { "m-for": "list", "m-key": "_x" }, "{_x}"),
        ]),
      ]);
      const [div1, div2] = data.ref.children;
      expect(div1.innerText).toBe(data[0]);
      expect(div2.innerText).toBe(data[1]);
    });
  });

  describe("When mFor is the first child", () => {
    test("Should output list of elements", () => {
      const data = {
        list: ["One", "Two"],
      };
      app(document.body, data, [
        element("ul", { "#ref": null }, [
          element("div", { "m-for": "list", "m-key": "_x" }, "{_x}"),
          element("li"),
        ]),
      ]);
      const [div1, div2] = data.ref.children;
      expect(div1.innerText).toBe(data[0]);
      expect(div2.innerText).toBe(data[1]);
    });
  });

  describe("When mFor is the last child", () => {
    test("Should output list of elements", () => {
      const data = {
        list: ["One", "Two"],
      };
      app(document.body, data, [
        element("ul", { "#ref": null }, [
          element("li"),
          element("div", { "m-for": "list", "m-key": "_x" }, "{_x}"),
        ]),
      ]);
      const [div1, div2] = data.ref.children;
      expect(div1.innerText).toBe(data[0]);
      expect(div2.innerText).toBe(data[1]);
    });
  });
});
