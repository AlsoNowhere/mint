const config = {
  testEnvironment: "jsdom",
  verbose: true,
  testPathIgnorePatterns: [
    "/node_modules/",

    /*

    -- Missing work
    should add comments on how things work

    -- Missing tests
    should renderBlueprint() have parentChildBlueprints passed in or derived instead?
    when doing lookup (in attribute, mIf, mFor etc) should be able to define property lookup (item.prop)
    When looking up property on ForData use Proxy for change OR use _x instead of saving item to ForData

    */

    // ** Short hand
    // "./tests/unit-tests/app",
    // "./tests/unit-tests/attributes",
    // "./tests/unit-tests/common-logic",
    // "./tests/unit-tests/components",
    // "./tests/unit-tests/defining-mFor-with-mIf",
    // "./tests/unit-tests/defining-mTemplate-with-mIf",
    // "./tests/unit-tests/elements",
    // "./tests/unit-tests/mExtend",
    // "./tests/unit-tests/mFor",
    // "./tests/unit-tests/mIf",
    // "./tests/unit-tests/mRef",
    // "./tests/unit-tests/mTemplate",
    // "./tests/unit-tests/prop-types",
    // "./tests/unit-tests/quick-elements",
    // "./tests/unit-tests/refresh",
    // "./tests/unit-tests/render",
    // "./tests/unit-tests/Resolver",
    // "./tests/unit-tests/store",
    // "./tests/unit-tests/storylines",

    // ** Full list
    // "./tests/unit-tests/app/app-basic",
    // "./tests/unit-tests/app/app-data-as-null",
    // "./tests/unit-tests/app/app-delete-app",
    // "./tests/unit-tests/app/app-verbose",
    // "./tests/unit-tests/app/life-cycles",

    // "./tests/unit-tests/attributes/basic-attribute",
    // "./tests/unit-tests/attributes/binding-attribute",
    // "./tests/unit-tests/attributes/define-attribute",
    // "./tests/unit-tests/attributes/events",
    // "./tests/unit-tests/attributes/number-values",

    // "./tests/unit-tests/common-logic/deBracer",

    // "./tests/unit-tests/components/attributes/basic-attribute",
    // "./tests/unit-tests/components/attributes/binding-attribute",
    // "./tests/unit-tests/components/attributes/events",

    // "./tests/unit-tests/components/_children/define-children-inside-other-content",
    // "./tests/unit-tests/components/_children/define-children-with-other-content",
    // "./tests/unit-tests/components/_children/define-children-basic",
    // "./tests/unit-tests/components/_children/double-children-usage",
    // "./tests/unit-tests/components/_children/use-correct-parent",

    // "./tests/unit-tests/components/lifecycles/onafterinsert",
    // "./tests/unit-tests/components/lifecycles/oneach",
    // "./tests/unit-tests/components/lifecycles/oninit",
    // "./tests/unit-tests/components/lifecycles/oninsert",
    // "./tests/unit-tests/components/lifecycles/onpreblueprint",

    // "./tests/unit-tests/components/multiple/individual-scope",

    // "./tests/unit-tests/components/props/refresh-props",
    // "./tests/unit-tests/components/props/string-props",

    // "./tests/unit-tests/components/scope/child-element",
    // "./tests/unit-tests/components/scope/define-scope",
    // "./tests/unit-tests/components/scope/set-value-from-scope",

    // "./tests/unit-tests/components/define-component",

    // "./tests/unit-tests/defining-mFor-with-mIf/refresh/when-mFor-changes",
    // "./tests/unit-tests/defining-mFor-with-mIf/refresh/when-mIf-changes",
    // "./tests/unit-tests/defining-mFor-with-mIf/mIf-before-mFor",
    // "./tests/unit-tests/defining-mFor-with-mIf/mIf-after-mFor",

    // "./tests/unit-tests/defining-mTemplate-with-mIf/refresh/when-mTemplate-changes",
    // "./tests/unit-tests/defining-mTemplate-with-mIf/mIf-after-mTemplate",
    // "./tests/unit-tests/defining-mTemplate-with-mIf/mIf-before-mTemplate",

    // "./tests/unit-tests/elements/div",
    // "./tests/unit-tests/elements/fragment",
    // "./tests/unit-tests/elements/node",

    // "./tests/unit-tests/mExtend/add-attributes",

    // "./tests/unit-tests/mFor/components/data-binding",
    // "./tests/unit-tests/mFor/components/loop-over-objects",
    // "./tests/unit-tests/mFor/components/loop-over-strings",
    // "./tests/unit-tests/mFor/components/remove-component",
    // "./tests/unit-tests/mFor/components/that-has-children",

    // "./tests/unit-tests/mFor/moving-item/moving-end-to-start",
    // "./tests/unit-tests/mFor/moving-item/moving-middle-to-end",
    // "./tests/unit-tests/mFor/moving-item/moving-middle-to-middle",
    // "./tests/unit-tests/mFor/moving-item/moving-middle-to-start",
    // "./tests/unit-tests/mFor/moving-item/moving-start-to-end",

    // "./tests/unit-tests/mFor/refresh/add-item-to-end",
    // "./tests/unit-tests/mFor/refresh/add-item-to-middle",
    // "./tests/unit-tests/mFor/refresh/add-item-to-start",
    // "./tests/unit-tests/mFor/refresh/add-several-items",
    // "./tests/unit-tests/mFor/refresh/no-changes",
    // "./tests/unit-tests/mFor/refresh/preserving_children",
    // "./tests/unit-tests/mFor/refresh/remove-item-at-end",
    // "./tests/unit-tests/mFor/refresh/remove-item-at-middle",
    // "./tests/unit-tests/mFor/refresh/remove-item-at-start",
    // "./tests/unit-tests/mFor/refresh/value-change",

    // "./tests/unit-tests/mFor/duplicate-keys",
    // "./tests/unit-tests/mFor/loop-over-objects",
    // "./tests/unit-tests/mFor/loop-over-strings",
    // "./tests/unit-tests/mFor/loop-over-with-events",
    // "./tests/unit-tests/mFor/mFor-with-siblings",
    // "./tests/unit-tests/mFor/simple-list",

    // "./tests/unit-tests/mIf/refresh/change-false-to-true",
    // "./tests/unit-tests/mIf/refresh/change-true-to-false",
    // "./tests/unit-tests/mIf/refresh/fragments",
    // "./tests/unit-tests/mIf/refresh/siblings",
    // "./tests/unit-tests/mIf/refresh/updating-attributes",

    // "./tests/unit-tests/mIf/component",
    // "./tests/unit-tests/mIf/fragments",
    // "./tests/unit-tests/mIf/inverse",
    // "./tests/unit-tests/mIf/siblings",
    // "./tests/unit-tests/mIf/simple-cases",
    // "./tests/unit-tests/mIf/warn",

    // "./tests/unit-tests/mRef/mRef",
    // "./tests/unit-tests/mRef/UpwardRef",

    // "./tests/unit-tests/mTemplate/define-content-with-template",
    // "./tests/unit-tests/mTemplate/refresh-template",

    // "./tests/unit-tests/prop-types/define-prop-types",

    // "./tests/unit-tests/quick-elements/div",
    // "./tests/unit-tests/quick-elements/span",

    // "./tests/unit-tests/refresh/app/changing-content-app",
    // "./tests/unit-tests/refresh/app/changing-content-element",
    // "./tests/unit-tests/refresh/app/refresh-app-basic",

    // "./tests/unit-tests/refresh/element/refresh-attributes"

    // "./tests/unit-tests/refresh/store/refresh-store"

    // "./tests/unit-tests/render/render-elements",

    // "./tests/unit-tests/Resolver/define-using-Resolver",
    // "./tests/unit-tests/Resolver/refresh-new-Resolver",

    // "./tests/unit-tests/store/connect-store",
    // "./tests/unit-tests/store/create-store",

    // "./tests/unit-tests/storylines/click-button-to-update",
    // "./tests/unit-tests/storylines/forms",

    // ** Always miss
  ],
};

module.exports = config;
