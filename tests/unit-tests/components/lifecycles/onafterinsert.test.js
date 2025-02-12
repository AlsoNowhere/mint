const {
  app,
  refresh,
  component,
  node,
  mIf,
} = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("Component Lifecycle - onafterinsert", () => {
  afterEach(clearApp);

  describe("Component first added", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const onafterinsert = jest.fn();
      const TestComponent = component("div", function () {
        this.onafterinsert = onafterinsert;
      });

      // ** Act
      app(document.body, {}, node(TestComponent));

      // ** Assert
      expect(onafterinsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("When mIf is false", () => {
    test("Should run after blueprints are generated", () => {
      // ** Arrange
      const onafterinsert = jest.fn();
      const TestComponent = component("div", function () {
        this.onafterinsert = onafterinsert;
      });

      // ** Act
      app(
        document.body,
        { case: false },
        node(TestComponent, { mIf: mIf("case") })
      );

      // ** Assert
      expect(onafterinsert).toHaveBeenCalledTimes(0);
    });
  });

  describe("Component refreshed", () => {
    describe("Nothing changes", () => {
      test("Should not run on refresh when nothing changes", () => {
        // ** Arrange
        const onafterinsert = jest.fn();
        const TestComponent = component("div", function () {
          this.onafterinsert = onafterinsert;
        });

        // ** Act
        const { scope } = app(
          document.body,
          { case: true },
          node(TestComponent, { mIf: mIf("case") })
        );
        refresh(scope);

        // ** Assert
        expect(onafterinsert).toHaveBeenCalledTimes(1);
      });
    });

    describe("When added with mIf", () => {
      test("Should not run on refresh when nothing changes", () => {
        // ** Arrange
        const onafterinsert = jest.fn();
        const TestComponent = component("div", function () {
          this.onafterinsert = onafterinsert;
        });

        // ** Act
        const { scope, rootScope } = app(
          document.body,
          { case: false },
          node(TestComponent, { mIf: mIf("case") })
        );

        // ** Assert
        expect(onafterinsert).toHaveBeenCalledTimes(0);

        // ** Act
        rootScope.case = true;
        refresh(scope);

        // ** Assert
        expect(onafterinsert).toHaveBeenCalledTimes(1);
      });
    });
  });
});
