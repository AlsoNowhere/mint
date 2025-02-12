const {
  app,
  refresh,
  component,
  node,
  mIf,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component Lifecycle - oninsert", () => {
  afterEach(clearApp);

  describe("Component first added", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const oninsert = jest.fn();
      const TestComponent = component("div", function () {
        this.oninsert = oninsert;
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(oninsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("When mIf is false", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const oninsert = jest.fn();
      const TestComponent = component("div", function () {
        this.oninsert = oninsert;
      });

      // ** Act
      app(
        document.body,
        { case: false },
        node(TestComponent, { mIf: mIf("case") })
      );

      // ** Assert
      expect(oninsert).toHaveBeenCalledTimes(0);
    });
  });

  describe("Component refreshed", () => {
    describe("Nothing changes", () => {
      test("Should not run on refresh when nothing changes", () => {
        // ** Arrange
        const oninsert = jest.fn();
        const TestComponent = component("div", function () {
          this.oninsert = oninsert;
        });

        // ** Act
        const { scope } = app(
          document.body,
          { case: true },
          node(TestComponent, { mIf: mIf("case") })
        );
        refresh(scope);

        // ** Assert
        expect(oninsert).toHaveBeenCalledTimes(1);
      });
    });

    describe("When added with mIf", () => {
      test("Should not run on refresh when nothing changes", () => {
        // ** Arrange
        const testOninsert = jest.fn();
        const TestComponent = component("div", function () {
          this.oninsert = testOninsert;
        });

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(TestComponent, { mIf: mIf("case") })
        );

        // ** Assert
        expect(testOninsert).toHaveBeenCalledTimes(0);

        // ** Act
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        expect(testOninsert).toHaveBeenCalledTimes(1);

        // ** Act
        rootScope.case = false;
        refresh(scope);

        // ** Assert
        expect(testOninsert).toHaveBeenCalledTimes(1);

        // ** Act
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        expect(testOninsert).toHaveBeenCalledTimes(2);
      });
    });
  });
});
