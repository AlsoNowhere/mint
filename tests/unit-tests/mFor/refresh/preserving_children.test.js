const { app, component, div, mFor, node, refresh, span } = require("../../../../dist/mint-test");
const { clearApp } = require("../../../test-services/clear-app");

describe("mFor - Refresh", () => {
  afterEach(clearApp);

  describe("Preserving _children in Components", () => {
    // ** The purpose of this test is to check that the correct _children nodes are being sent to each new
    // ** element created on a mFor refresh.
    // ** This is an incredible edge case and is hard to figure out.

    test("Should use both the childNodes and _children correctly for newly added elements", () => {
      // ** Arrange
      const Lemon = component("section", null, {}, [
        // ** We define a SPAN
        span("Gear"),
        // ** and the _children such should be a DIV
        "_children"
      ]);
      const list = ["one"];

      // ** Act
      const { scope } = app(
        document.body,
        { list },
        node("main", null, node(Lemon, { ...mFor("list"), mKey: "_i" }, [div("Peas")]))
      );
      list.push("two");
      refresh(scope);

      // ** Assert
      const { lastChild: main } = document.body;
      const [section1, section2] = main.children;
      const [span1, div1] = section1.children;
      const [span2, div2] = section2.children;
      expect(span1.tagName).toBe("SPAN");
      expect(div1.tagName).toBe("DIV");
      expect(span2.tagName).toBe("SPAN");
      expect(div2.tagName).toBe("DIV");
    });
  });
});
