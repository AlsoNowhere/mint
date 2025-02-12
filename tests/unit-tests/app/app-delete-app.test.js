const { app, deleteApp } = require("../../../dist/mint-test");
const { clearApp } = require("../../test-services/clear-app");

describe("Remove a simple app", () => {
  afterEach(clearApp);

  test("Should remove all the elements after adding them", () => {
    // ** Arrange
    const rootElement = document.body;
    const rootScope = {};
    const content = "test value";

    // ** Act
    const _app = app(rootElement, rootScope, content);

    // ** Assert
    expect(rootElement.childNodes.length).toBe(1);

    // ** Act
    deleteApp(_app);

    // ** Assert
    expect(rootElement.childNodes.length).toBe(0);
  });
});
