const { app, component, node, Store } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Connect a Store to a Component", () => {
  afterEach(clearApp);

  test("Should add the store values to the scope of the Component", () => {
    // ** Arrange
    const value = "Example";
    const newStore = new Store({
      test: value,
    });
    let componentScope;
    const Test = component(
      "div",
      function () {
        componentScope = this;
        newStore.connect(this);
      },
      null,
      "Content -- {test}"
    );

    // ** Act
    app(document.body, {}, node(Test));

    // ** Assert
    expect(componentScope.test).toBe(value);
    const [div] = document.body.children;
    expect(div.textContent).toBe(`Content -- ${value}`);
  });
});
