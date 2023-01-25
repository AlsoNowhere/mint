const mint = require("../../dist/mint-test");

const { app, element } = mint;

describe("Add an attribute via binding reference", () => {
  test("Should add a new attribute", () => {
    const content = "renders";

    app(
      document.body,
      {
        value: content,
      },
      element("div", { "[dataTest]": "value" })
    );

    const [div] = document.body.children;

    expect(div.attributes["dataTest"].nodeValue).toBe(content);
  });
});
