const { app, component, node, mFor } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Components - that has _children", () => {
  afterEach(clearApp);

  test("Should add the looped over Components without getting into and infinite error", () => {
    // ** Arrange
    const testContent = "Content that acts as _children";
    const Basic = component("div", function () {}, null, "_children");

    // ** Act
    app(
      document.body,
      { list: ["One"] },
      node(Basic, { ...mFor("list"), mKey: "_i" }, testContent)
    );

    // ** Assert
    const lastChild = document.body;
    expect(lastChild.textContent).toBe(testContent);
  });
});
