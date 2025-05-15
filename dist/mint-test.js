'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class CreateNode {
    constructor(mintNode, props = null, content = null) {
        this.mintNode = mintNode;
        this.props = props;
        this.content = content;
    }
}

const MINT_ERROR = "MINT ERROR --";
const MINT_WARN = "MINT WARN --";
const global = {
    mintElement_index: 0,
};
const attributesThatAreBoolean = ["checked"];
const attributesThatAreProperties = [
    "checked",
    "value",
    "textContent",
    "innerHTML",
];
const forScopePermantProperties = [
    "_x",
    "_i",
    "mintElement_index",
    "_mintBlueprint",
];

const handleAppErrors = (rootElement, baseRootScope, initialContent) => {
    // ** CATCH the user passing in non HTMLElement for rootElement.
    if (!(rootElement instanceof HTMLElement))
        throw "app -- rootElement -- You must pass a HTMLElement for the rootElement.";
    // ** CATCH the user passing in null for rootScope.
    if (baseRootScope === null)
        throw "app -- rootScope -- Cannot pass null as root scope. Root scope is defined against generic T as can't autofill from null.";
    // ** CATCH the user not passing in Object for rootScope.
    if (typeof baseRootScope !== "object")
        throw "app -- rootScope -- Value not Object.";
    // ** CATCH the user not passing either a string, MintElement or Array.
    if (typeof initialContent !== "string" &&
        !(initialContent instanceof Array) &&
        !(initialContent instanceof CreateNode)) {
        throw "app -- content -- Must be string or Array.";
    }
    // ** CATCH the user passing "_children" keyword incorrectly.
    if ((initialContent instanceof Array && initialContent.includes("_children")) ||
        initialContent === "_children") {
        throw new Error(`${MINT_ERROR} Can only pass "_children" as child of Component.`);
    }
};

class MintAttribute {
    constructor(cloneAttribute) {
        this.cloneAttribute = cloneAttribute;
    }
}

// ** Props are defined at the Mint Node level but when we create Mint Elements we
// ** need to make sure these are unique so here we clone the props.
const cloneProps = ({ props }) => {
    const newProps = {};
    if (!props) {
        return newProps;
    }
    for (let [key, value] of Object.entries(props)) {
        if (value instanceof MintAttribute) {
            // ** In specific examples, such as when cloning a MintNode for use in mFor, we need to make sure
            // ** each MintAttribute is unique.
            newProps[key] = value.cloneAttribute(value);
        }
        else {
            newProps[key] = value;
        }
    }
    return newProps;
};

// ** IMPORTANT
// ** The order in which mint attributes are processed it important.
// ** For example: mIf, if false, should stop all other blueprinting.
const mintAttributeOrder = ["mExtend", "mIf", "mFor", "mRef"];
const mintAttributesList = ["mExtend", "mIf", "mFor", "mRef"];
const attributesToIgnore = [
    "mintElement_index",
    ...mintAttributeOrder,
    "mKey",
];

const conflicts = [
    ["mIf", "mFor"],
    ["mFor", "mRef"],
];
const resolveConflicts = (keys) => {
    for (let [a, b] of conflicts) {
        if (keys.includes(a) && keys.includes(b)) {
            throw new Error(`${MINT_ERROR} attributes -- Cannot have ${a} and ${b} on the same element.`);
        }
    }
};
// ** Certain Properties (Component props) and Attributes on Components and Elements need to be
// ** run in a particular order. We create that order here as an Array of strings (Object keys).
const resolvePropsOrder = (props) => {
    const keys = Object.keys(props);
    // ** Certain attributes cannot be both on an element, resolve that here.
    resolveConflicts(keys);
    keys.sort(([a], [b]) => {
        return mintAttributeOrder.indexOf(a) - mintAttributeOrder.indexOf(b);
    });
    return keys;
};

// ** Here we fix a duplication of logic that is for the users' benefit.
const fixProps = (props) => {
    if (props === null)
        return;
    for (let key of Object.keys(props)) {
        if (mintAttributesList.includes(key)) {
            if (props[key][key]) {
                props[key] = props[key][key];
            }
        }
    }
};

const generateBlueprint = ({ node, parentBlueprint, scope, _rootScope, isSVG, useGivenScope, }) => {
    var _a;
    fixProps(node.props);
    const props = cloneProps({ props: (_a = node.props) !== null && _a !== void 0 ? _a : {} });
    /* Dev */
    // _DevLogger_("GENERATE", "Blueprint", mintContent);
    // ** ORDER IS IMPORTANT!
    // ** Here we take the attributes and order them in a specific run order.
    // ** This way they don't conflict with each other.
    const orderedProps = resolvePropsOrder(props);
    // ** Here we get the generate function for this particular mint element.
    const { generate } = node.mintNode;
    // ** If this is MintText or MintElement then the "generate" function will be on this MintNode.
    const blueprint = generate({
        node,
        orderedProps,
        props,
        scope,
        parentBlueprint,
        _rootScope,
        isSVG,
        useGivenScope,
    });
    return blueprint;
};
const generateBlueprints = ({ nodes, scope, parentBlueprint, _rootScope, isSVG = false, useGivenScope = false, }) => {
    // <@ REMOVE FOR PRODUCTION
    if (nodes.find((x) => !(x instanceof CreateNode))) {
        throw new Error(`${MINT_ERROR} generateBlueprints -- nodes sent not correctly implemented.`);
    }
    // @>
    // ** Use parent scope if available. If it isn't, then use the rootScope.
    // ** This means that the blueprint must be at the app level.
    const blueprints = [];
    for (let node of nodes) {
        blueprints.push(generateBlueprint({
            node,
            scope,
            parentBlueprint,
            _rootScope,
            isSVG,
            useGivenScope,
        }));
    }
    return blueprints;
};

class Blueprint {
    constructor({ mintNode = null, render = null, refresh = null, scope, parentBlueprint, _rootScope, }) {
        this.mintNode = mintNode;
        this.render = render;
        this.refresh = refresh;
        this.scope = scope;
        this.parentBlueprint = parentBlueprint;
        this._rootScope = _rootScope;
        this.mintElement_index = ++global.mintElement_index;
    }
}

class TextBlueprint extends Blueprint {
    constructor({ mintNode, element, textValue, scope, parentBlueprint, _rootScope, }) {
        super({
            mintNode,
            scope,
            parentBlueprint,
            _rootScope,
        });
        this.element = element;
        this.textValue = textValue;
        this._dev = "Text";
    }
}

const generateTextBlueprint = ({ node, scope, parentBlueprint, _rootScope, }) => {
    // ** This Function can only be accessed by a MintText so tell TS that here.
    const mintText = node.mintNode;
    // ** Create the TextNode in JS.
    const textNode = document.createTextNode("");
    const { textValue } = mintText;
    return new TextBlueprint({
        mintNode: mintText,
        element: textNode,
        textValue,
        scope,
        parentBlueprint,
        _rootScope,
    });
};

// ** This function allows the definition of property look ups on the scope.
// ** E.g 1
// ** { "[class]": "data.class"}
// ** scope = { data: { class: "padding" } }
// ** E.g 2
// ** const str = "Content: {data.content}"
// ** scope = { data: { content: "text value" } }
const resolvePropertyLookup = (target, scope) => {
    var _a;
    if (target === "_children") {
        return (_a = scope._mintBlueprint.contentFor_children) === null || _a === void 0 ? void 0 : _a.length;
    }
    let _value = scope;
    const lookups = target.split(".");
    for (let x of lookups) {
        // <@ REMOVE FOR PRODUCTION
        if (!(_value instanceof Object)) {
            console.warn(`${MINT_WARN} while attempting to parse value "{${target}}" a non object was found -> ${_value}.`);
            return "";
        }
        // @>
        _value = _value[x];
    }
    return _value;
};

/*
  This function takes a string and an Object (scope). Every time the string
  contains braces with a variable inside we extract the value from the scope
  and replace it in the string.
  E.g:
  cosnt str = "Here is {content}";
  const scope = { content: "the truth" };

  str becomes "Here is the truth".
*/
//<@ REMOVE FOR PRODUCTION
const deBracerError = (text, scope, errorMessage) => {
    console.error(errorMessage, " -- deBracer ERROR. Text sent: ", text, "Scope: ", scope);
    throw new Error(`${MINT_ERROR} Text sent to resolve, not text: ${text}`);
};
//@>
const resolve = (_value, scope, errorMessage) => {
    const value = _value instanceof Function ? _value.apply(scope) : _value;
    // ** Get a resolved string only value.
    const resolvedValue = (() => {
        if (value === undefined || value === null)
            return "";
        if (typeof value === "number")
            return value.toString();
        return value;
    })();
    // ** Here we allow the Dev to define a string output that might contain {variable} itself.
    // ** Cycle through until all are resolved.
    return deBracer(resolvedValue, scope, errorMessage);
};
const deBracer = (text, scope, errorMessage) => {
    /* Dev */
    // _DevLogger_("Debracer", errorMessage, text, scope);
    //<@ REMOVE FOR PRODUCTION
    if (typeof text !== "string" && typeof text !== "number")
        deBracerError(text, scope, errorMessage);
    //@>
    const textValue = typeof text === "string" ? text : text.toString();
    return textValue.replace(/\\*\{[.a-zA-Z0-9_$]+\}/g, (x) => {
        // ** If value is matched as "\{variable}" then return "{variable}".
        if (x.charAt(0) === "\\")
            return x.substring(1);
        // ** Get the variable, i.e "{variable}" -> "variable".
        const subStr = x.substring(1, x.length - 1);
        if (x.includes(".")) {
            const _value = resolvePropertyLookup(subStr, scope);
            return resolve(_value, scope, errorMessage);
        }
        // ** Get the value.
        const _value = scope[subStr];
        return resolve(_value, scope, errorMessage);
    });
};

const refreshTextNode = (blueprint) => {
    const { element, textValue } = blueprint;
    /* Dev */
    // _DevLogger_("REFRESH", "TEXTNODE", textNode);
    element.nodeValue = deBracer(textValue, blueprint.scope, "Refresh - textNode");
    return { condition: false };
};

const getWhereToInsert = (parentElement, childBlueprints, blueprintIndex) => {
    for (let [i, blueprint] of childBlueprints.entries()) {
        if (i < blueprintIndex + 1)
            continue;
        const collection = blueprint.collection || blueprint.forListBlueprints;
        if (collection instanceof Array) {
            for (let contentBlueprint of collection) {
                const element = contentBlueprint.element;
                if (parentElement.contains(element !== null && element !== void 0 ? element : null)) {
                    return element;
                }
            }
        }
        if (blueprint.element === undefined) {
            continue;
        }
        const element = blueprint.element;
        if (parentElement.contains(element)) {
            return element;
        }
    }
};
// ** This function takes a HTMLElement and add its into the parent HTMLElement.
const addElement = (element, parentElement, blueprintsList, blueprintIndex) => {
    /* DEV */
    // _DevLogger_("ADD", "ELEMENT", element, blueprintsList);
    const elementToInsertBefore = getWhereToInsert(parentElement, blueprintsList, blueprintIndex);
    if (elementToInsertBefore !== undefined) {
        parentElement.insertBefore(element, elementToInsertBefore);
    }
    else {
        parentElement.appendChild(element);
    }
};

const renderTextBlueprint = (blueprint, parentElement, childBlueprints, blueprintIndex) => {
    /* Dev */
    // _DevLogger_("RENDER", "TEXTNODE", blueprint);
    const { element, textValue, scope } = blueprint;
    if (element instanceof Text) {
        element.nodeValue = deBracer(textValue, scope, "Render - textNode");
        addElement(element, parentElement, childBlueprints, blueprintIndex);
    }
};

class MintNode {
    constructor(content, generate, render, refresh) {
        this.content = content instanceof Array ? content : content === null ? [] : [content];
        this.generate = generate;
        this.render = render;
        this.refresh = refresh;
    }
}

class MintText extends MintNode {
    constructor(textValue) {
        super(null, generateTextBlueprint, renderTextBlueprint, refreshTextNode);
        this.textValue = textValue;
    }
}

// ** This function takes an Array of raw content that the user can more easily define
// ** and returns Mint consumable Nodes.
const createMintText = (initialContent) => {
    const content = [];
    const targetContent = [];
    if (initialContent === null)
        return content;
    if (!(initialContent instanceof Array)) {
        targetContent.push(initialContent);
    }
    else {
        targetContent.push(...initialContent);
    }
    for (let x of targetContent) {
        // ** We only accept MintNodes and so here we check if the user has passed in string values.
        // ** Then we replace them with MintTextNodes.
        if (typeof x === "string") {
            content.push(new CreateNode(new MintText(x)));
        }
        else {
            content.push(x);
        }
    }
    return content;
};

const hasUpdatingBlueprint = (blueprintToCheck, blueprints) => {
    if (blueprints.includes(blueprintToCheck)) {
        return true;
    }
    let beingUpdated = false;
    for (let item of blueprints) {
        if (!!item.childBlueprints) {
            beingUpdated = hasUpdatingBlueprint(blueprintToCheck, item.childBlueprints);
        }
        if (beingUpdated === true)
            break;
    }
    return beingUpdated;
};
class Tracker extends Array {
    constructor() {
        super();
        this.addBlueprint = function (blueprint) {
            this.push(blueprint);
        };
        this.removeBlueprint = function (blueprint) {
            const index = this.indexOf(blueprint);
            this.splice(index, 1);
        };
        this.updating = function (blueprint) {
            return hasUpdatingBlueprint(blueprint, this);
        };
    }
}

const currentlyTracking = new Tracker();

const resolveMAttributesOnRender = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    const { orderedProps = [], props = {} } = blueprint;
    let shouldExit = { condition: false, value: undefined };
    for (let key of orderedProps) {
        const property = props[key];
        const resolver = property.onRender;
        if (shouldExit.condition === false &&
            property instanceof MintAttribute &&
            resolver instanceof Function) {
            shouldExit = resolver.apply(property, [
                blueprint,
                parentElement,
                parentChildBlueprints,
                blueprintIndex,
            ]);
        }
    }
    return shouldExit;
};

const renderBlueprint = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    /* DEV */
    // _DevLogger_("RENDER", "Blueprint", blueprint);
    {
        const shouldReturn = resolveMAttributesOnRender(blueprint, parentElement, parentChildBlueprints, blueprintIndex);
        if (shouldReturn.condition) {
            return;
        }
    }
    if (blueprint.mintNode === null) {
        const { collection } = blueprint;
        if (collection) {
            const indexes = [];
            let i = blueprintIndex;
            while (i - blueprintIndex < collection.length) {
                indexes.push(i);
                i++;
            }
            renderBlueprints(collection, parentElement, parentChildBlueprints, indexes);
        }
        return;
    }
    blueprint.mintNode.render(blueprint, parentElement, parentChildBlueprints, blueprintIndex);
};
const renderBlueprints = (blueprints, parentElement, parentChildBlueprints = blueprints, indexes) => {
    for (let [index, blueprint] of blueprints.entries()) {
        renderBlueprint(blueprint, parentElement, parentChildBlueprints, !!indexes ? indexes[index] : index);
    }
};

// ** Root of the application.
// ** There can be more than one application in a project.
const app = (rootElement, baseRootScope, initialContent, { componentResolvers } = { componentResolvers: [] }) => {
    var _a, _b;
    // <@ REMOVE FOR PRODUCTION
    handleAppErrors(rootElement, baseRootScope, initialContent);
    // @>
    const rootScope = Object.assign(Object.assign({}, baseRootScope), { _isRootScope: true, _rootElement: rootElement, _rootChildBlueprints: [], componentResolvers });
    // ** LIFECYCLE CALL
    // ** This one runs before the blueprints are made, but after the data is defined.
    (_a = rootScope.onpreblueprint) === null || _a === void 0 ? void 0 : _a.call(rootScope, { scope: rootScope });
    // ** Create the app content that will be added to the root element.
    const content = createMintText(initialContent);
    // ** Generate the blueprints.
    const blueprints = generateBlueprints({
        nodes: content,
        scope: rootScope,
        parentBlueprint: null,
        _rootScope: rootScope,
        isSVG: false,
    });
    /* Dev */
    // _DevLogger_("APP", "BLUEPRINTS", blueprints);
    // ** Save a reference to the blueprints that are at the root element (App) level to the rootScope.
    rootScope._rootChildBlueprints = blueprints;
    // ** LIFECYCLE CALL
    // ** This is called only once.
    (_b = rootScope.oninit) === null || _b === void 0 ? void 0 : _b.call(rootScope, { scope: rootScope });
    // ** Render the blueprints with a tracker.
    // ** We detect if one of the renders tries to trigger a refresh, which is not allowed.
    // {
    for (let [index, blueprint] of blueprints.entries()) {
        // <@ REMOVE FOR PRODUCTION
        // ** If render or refresh is called on a blueprint that is currently rendering or refreshing then its an error.
        if (currentlyTracking.updating(blueprint))
            throw new Error(`${MINT_ERROR} Render was run on blueprint that was already rendering.`);
        currentlyTracking.addBlueprint(blueprint);
        // @>
        renderBlueprints([blueprint], rootElement, blueprints, [index]);
        // <@ REMOVE FOR PRODUCTION
        currentlyTracking.removeBlueprint(blueprint);
        // @>
    }
    // ** Here we define and return a function that can remove a created app.
    return { rootElement, scope: blueprints, rootScope };
};

const extractElements = (blueprints, blueprintElements = []) => {
    const _blueprints = [];
    for (let blueprint of blueprints) {
        _blueprints.push(Object.assign({}, blueprint));
    }
    for (let blueprint of _blueprints) {
        if (blueprint.element) {
            blueprintElements.push(blueprint.element);
        }
        if (blueprint.collection) {
            extractElements(blueprint.collection, blueprintElements);
        }
    }
    return blueprintElements;
};
const deleteApp = (app) => {
    const { rootElement, scope } = app;
    // ** We get all the Nodes that could be on the Document only from this given app.
    const blueprintElements = extractElements(scope);
    // ** We get all the elements that are currently on the rootElement. If this is the document.body then this will include SCRIPT.
    const rootElementNodes = Array.from(rootElement.childNodes);
    for (let x of rootElementNodes) {
        if (blueprintElements.includes(x)) {
            // ** If this Node from this app is a child of the rootElement then we remove it.
            rootElement.removeChild(x);
        }
    }
};

const cloneContent = (mintContent) => {
    return mintContent;
};

// ** This function returns the getter part of a property lookup, if it has one.
const resolverGetter = (key, parentScope) => {
    const properties = Object.getOwnPropertyDescriptor(parentScope, key);
    let output = undefined;
    if (properties === undefined)
        return output;
    // ** We can reason here that there must be a getter if it's no writable
    // ** as Mint doesn't create one with the other.
    if (properties.writable === undefined) {
        output = properties.get;
    }
    return output;
};

class ScopeTransformer {
    constructor(transform) {
        this.transform = transform;
    }
}

// ** Some props on a Component are not what should be accessed when doing a lookup
// ** on that item.
// ** For example content that is derived at lookup time from something else.
// ** We replace those here with the other content.
const applyScopeTransformers = (scope) => {
    const keys = Object.keys(scope);
    for (let key of keys) {
        // ** We need to check if this value has already been applied.
        // ** We can do this by checking if the value is writable and has a getter.
        const getter = resolverGetter(key, scope);
        // ** We don't want to lookup the item at this time and so we ignore these.
        if (getter === undefined && scope[key] instanceof ScopeTransformer) {
            scope[key].transform(scope, key);
        }
    }
};

// ** This function gets the content that should be used to replace "_children".
// ** It works by having the content saved when the Component is used in an element().
// ** This is then replaced with cloned content from the Component definition.
// ** This saved content can then be used to replace "_children" where it it defined.
const getContent = (blueprint) => {
    const { parentBlueprint, contentFor_children } = blueprint;
    // ** If the content is valid then return this.
    if (contentFor_children !== undefined)
        return contentFor_children;
    // ** If the parent does not have valid content then pass undefined, which will be ignored to prevent errors.
    if (parentBlueprint === null)
        return;
    // ** We cycle back through until we get valid content.
    return getContent(parentBlueprint);
};
const resolveChildBlueprints = (blueprint, childBlueprints, isSVG) => {
    const { scope, _rootScope } = blueprint;
    // ** Here we get the content that should be used to replace "_children".
    // ** This is pre Blueprint generated rated.
    const childrenContent = getContent(blueprint);
    if (childrenContent !== undefined) {
        // ** If this is the keyword "_children" then replace this with childrenContent.
        // ** As these are blueprints then they will need to be cloned and unique at the render phase.
        for (let [i, item] of childBlueprints.entries()) {
            if (item instanceof TextBlueprint && item.textValue === "_children") {
                // ** This is IMPORTANT.
                // ** We need to remove "_children" before generating Blueprints otherwise we'll get into
                // ** an infinite loop.
                childBlueprints.splice(i, 1);
                // ** Now we can generate the Blueprints.
                const _children = generateBlueprints({
                    nodes: childrenContent,
                    scope,
                    parentBlueprint: blueprint,
                    _rootScope,
                    isSVG,
                });
                // ** Now we insert the Blueprints, replacing "_children".
                childBlueprints.splice(i, 0, ..._children);
            }
        }
    }
    return childBlueprints;
};

// ** This function returns if a string matches the provided start and end characters.
// ** E.g 1
// ** str = "[class]"
// ** matches isAttrType(str, "[", "]")
// ** E.g 2
// ** str = "(click)"
// ** matches isAttrType(str, "(", ")")
const isAttrType = (attr, start, end) => {
    return attr.charAt(0) === start && attr.charAt(attr.length - 1) === end;
};

const handleResolverProperties = (scope, key, value, parentScope) => {
    const getter = resolverGetter(value, parentScope);
    if (getter instanceof Function) {
        // ** If getter is undefined it means that this property is a getter, therefore created by the Resolver Object.
        // ** With that in mind we want to preserve this getter instead of just using the current value.
        Object.defineProperty(scope, key, {
            get: getter,
            configurable: true,
        });
    }
    else {
        const newValue = resolvePropertyLookup(value, parentScope);
        // ** Here we check what the new value is going to be.
        // ** If its undefined or null it means we don't want to change the default or previously
        // ** defined value.
        if (newValue === undefined || newValue === null)
            return;
        scope[key] = newValue;
    }
};
const bindingTemplateProp = (scope, key, value, parentScope) => {
    if (key !== "scope") {
        handleResolverProperties(scope, key, value, parentScope);
        return;
    }
};
// ** When a Component is defined, props are provided to it.
// ** Here we take those props and assign their values from the parent scope to this Component.
const assignProps = (scope, orderedProps, props, parentScope) => {
    for (let key of orderedProps) {
        const value = props[key];
        if (isAttrType(key, "[", "]")) {
            const _key = key.substring(1, key.length - 1);
            bindingTemplateProp(scope, _key, value, parentScope);
        }
        else {
            const descriptors = Object.getOwnPropertyDescriptor(scope, key);
            // ** We do not want to try to assign to a property that only has a getter. Check for that here.
            if (descriptors !== undefined &&
                descriptors.get !== undefined &&
                descriptors.set === undefined) {
                return;
            }
            // ** If the prop is a string then extract the values (deBrace) from it before assigning.
            if (typeof value === "string") {
                scope[key] = deBracer(value, parentScope, "Template -- props");
            }
            else {
                scope[key] = value;
            }
        }
    }
};

const checkForErrorsOnBlueprint = (blueprint) => {
    // <@ REMOVE FOR PRODUCTION
    if (blueprint.element === undefined) {
        if (blueprint.collection === undefined) {
            throw new Error(`${MINT_ERROR} Element Blueprint was defined without element or collection.`);
        }
    }
    if (blueprint.element !== undefined) {
        if (blueprint.collection !== undefined) {
            throw new Error(`${MINT_ERROR} Element Blueprint was defined with both element and collection.`);
        }
    }
    if (blueprint.collection !== undefined) {
        if (blueprint.childBlueprints !== undefined) {
            throw new Error(`${MINT_ERROR} Element Blueprint was defined with both collection and childBlueprints.`);
        }
    }
    // @>
};

const resolveMAttributesOnGenerate = ({ node, htmlElement, orderedProps, props, parentScope, scope, _children, parentBlueprint, _rootScope, isSVG, isComponent, isAttribute, }) => {
    let shouldExit = { condition: false, value: undefined };
    for (let key of orderedProps) {
        const property = props[key];
        const resolver = property.onGenerate;
        if (shouldExit.condition === false &&
            property instanceof MintAttribute &&
            resolver instanceof Function) {
            shouldExit = resolver.apply(property, [
                {
                    node,
                    htmlElement,
                    orderedProps,
                    props,
                    parentScope,
                    scope,
                    _children,
                    parentBlueprint,
                    _rootScope,
                    isSVG,
                    isComponent,
                    isAttribute,
                },
            ]);
        }
    }
    return shouldExit;
};

class MintScope {
    constructor() { }
}

class ComponentBlueprint extends Blueprint {
    constructor({ mintNode, fragment, element, orderedProps, props, orderedAttributes, attributes, scope, parentBlueprint, collection, childBlueprints, _rootScope, contentFor_children }) {
        super({
            mintNode,
            scope,
            parentBlueprint,
            _rootScope
        });
        if (!!fragment)
            this.fragment = fragment;
        if (!!element)
            this.element = element;
        this.orderedProps = orderedProps;
        this.props = props;
        this.orderedAttributes = orderedAttributes;
        this.attributes = attributes;
        if (!!collection)
            this.collection = collection;
        if (!!childBlueprints)
            this.childBlueprints = childBlueprints;
        if (!!contentFor_children)
            this.contentFor_children = contentFor_children;
        if (element instanceof SVGElement)
            this.isSVG = true;
        this._dev = "Component";
    }
}

const generateComponentBlueprint = ({ node, orderedProps, props, scope: parentScope, parentBlueprint, _rootScope, isSVG, useGivenScope }) => {
    var _a, _b;
    const { mintNode, content: _children } = node;
    fixProps(mintNode.attributes);
    const mintComponent = mintNode;
    const { element, content } = mintComponent;
    const attributes = cloneProps({
        props: mintComponent.attributes
    });
    const orderedAttributes = resolvePropsOrder(attributes);
    // <@ REMOVE FOR PRODUCTION
    if (!(mintComponent.scope instanceof Function) && mintComponent.scope !== null) {
        throw new Error(`${MINT_ERROR} Mint Component -- scope -- must pass a constructor function for Component scope argument (second argument) i.e component("div", function(){}`);
    }
    // @>
    element === "svg" && (isSVG = true);
    // <@ REMOVE FOR PRODUCTION
    if (element !== "<>" && ((element === null || element === void 0 ? void 0 : element.includes("<")) || (element === null || element === void 0 ? void 0 : element.includes(">")))) {
        throw new Error(`${MINT_ERROR} Element sent to node() contains angle brackets "${element}". Use "${element.substring(1, element.length - 1)}" instead.`);
    }
    // @>
    // ** Generate new HTMLElement.
    // ** If this is a Fragment then a new Element won't be defined.
    let newHTMLElement = undefined;
    if (element !== undefined && element !== "<>") {
        newHTMLElement =
            element === "svg" || isSVG
                ? document.createElementNS("http://www.w3.org/2000/svg", element)
                : document.createElement(element);
    }
    // ** Create the new Component's scope.
    let componentScope;
    if (useGivenScope) {
        // ** When mFor is looped over a Component an extra layer of scope is added.
        // ** In order to get the original Component we must do it manually here.
        componentScope = parentScope;
    }
    else {
        componentScope = new ((_a = mintComponent.scope) !== null && _a !== void 0 ? _a : MintScope)();
        // ** Certain props are ScopeTransformer objects and apply their values differently
        // ** to the Component.
        // ** We handle that here.
        applyScopeTransformers(componentScope);
    }
    // ** Here we check for app level Component Resolvers.
    // ** These are things that are run against the Component.
    // ** For example generating prop types checks.
    if (!!_rootScope.componentResolvers) {
        for (let componentResolver of _rootScope.componentResolvers) {
            componentResolver(orderedProps !== null && orderedProps !== void 0 ? orderedProps : [], props !== null && props !== void 0 ? props : {}, mintComponent, parentScope);
        }
    }
    if (!useGivenScope) {
        // ** When a Component is defined, props are provided to it.
        // ** Here we take those props and assign their values from the parent scope to this Component.
        assignProps(componentScope, orderedProps !== null && orderedProps !== void 0 ? orderedProps : [], props !== null && props !== void 0 ? props : {}, parentScope);
    }
    const commonValues = {
        node,
        htmlElement: newHTMLElement,
        parentScope,
        scope: componentScope,
        _children,
        parentBlueprint,
        _rootScope,
        isSVG,
        isComponent: true
    };
    {
        // ** Here we resolve the props of the Component.
        // ** If one of the mAttributes on the list means we stop generating here then detect that.
        const shouldReturn = resolveMAttributesOnGenerate(Object.assign({ orderedProps: orderedProps !== null && orderedProps !== void 0 ? orderedProps : [], props: props !== null && props !== void 0 ? props : {}, isAttribute: false }, commonValues));
        if (shouldReturn.condition) {
            return shouldReturn.value;
        }
    }
    {
        // ** Here we resolve the attributes of the Component.
        // ** If one of the mAttributes on the list means we stop generating here then detect that.
        const shouldReturn = resolveMAttributesOnGenerate(Object.assign({ orderedProps: orderedAttributes, props: attributes, isAttribute: true }, commonValues));
        if (shouldReturn.condition) {
            return shouldReturn.value;
        }
    }
    // ** LIFECYCLE CALL
    (_b = componentScope.onpreblueprint) === null || _b === void 0 ? void 0 : _b.call(componentScope);
    // ** We define the content that might be used to populate the "_children" keyword inside
    // ** the Component.
    const blueprint = new ComponentBlueprint({
        mintNode: mintComponent,
        fragment: element === "<>" || undefined,
        element: newHTMLElement,
        orderedProps: orderedProps !== null && orderedProps !== void 0 ? orderedProps : [],
        props: props !== null && props !== void 0 ? props : {},
        orderedAttributes,
        attributes,
        scope: componentScope,
        parentBlueprint,
        _rootScope
    });
    if (!!_children) {
        blueprint.contentFor_children = [];
        for (let x of _children) {
            blueprint.contentFor_children.push(cloneContent(x));
        }
    }
    componentScope._mintBlueprint = blueprint;
    /* Dev */
    // _DevLogger_("GENERATE", "COMPONENT", blueprint, parentBlueprint);
    // ** Clone the content so that each Component has unique content from the original definition.
    const _content = [];
    for (let x of content) {
        _content.push(cloneContent(x));
    }
    const _childBlueprints = generateBlueprints({
        nodes: _content,
        scope: componentScope,
        parentBlueprint: blueprint,
        _rootScope,
        isSVG
    });
    // ** Check if the children content contains the "_children" keyword.
    // ** Using this allows the content of this child blueprint to use custom content passed into this parent Component.
    // ** E.g
    /*
      const Sub = component("div", null, null, "_children");
      const Main = component("main", null, null, element(Sub, null, "Content"));
  
      Produces:
  
      <main>
        <div>Content</div>
      </main>
    */
    const childBlueprints = resolveChildBlueprints(blueprint, _childBlueprints, isSVG);
    if (element === "<>") {
        blueprint.collection = childBlueprints;
    }
    else {
        blueprint.childBlueprints = childBlueprints;
    }
    checkForErrorsOnBlueprint(blueprint);
    return blueprint;
};

const renderEventAttributes = (element, key, value, orderedAttributes, attributes, scope) => {
    // ** Get the function we will run on the listener from the scope.
    const eventFunction = scope[value];
    // ** As the target value is stored inside parenthesis we extract it here.
    // ** e.g (click) -> click
    const target = key.substring(1, key.length - 1);
    const listener = (event) => {
        // ** We do not let undefined mean an absense of a value here because undefined could be an accident.
        // ** We check for null instead as that is not a default value.
        if (eventFunction === undefined) {
            console.error(element);
            throw new Error(`${MINT_ERROR} Event provided is undefined, use instead null to skip, for event '${target}' - '${value}'.`);
        }
        if (eventFunction === null)
            return;
        eventFunction.apply(scope, [event, element, scope]);
    };
    const options = eventFunction === null || eventFunction === void 0 ? void 0 : eventFunction.mintEventOptions;
    element.addEventListener(target, listener, options);
    {
        // ** To make sure this isn't added more than once, remove it once added.
        let index = -1;
        for (let [i, _key] of orderedAttributes.entries()) {
            if (_key === key) {
                index = i;
            }
        }
        index !== undefined && index !== -1 && orderedAttributes.splice(index, 1);
        delete attributes[key];
    }
};

const getValue = (property, scope) => {
    const getter = resolverGetter(property, scope);
    let _value = getter instanceof Function ? getter.apply(scope) : scope[property];
    if (typeof _value === "number") {
        _value = _value.toString();
    }
    return _value;
};
const renderBindingAttributes = (element, key, property, scope) => {
    const target = key.substring(1, key.length - 1);
    const _value = getValue(property, scope);
    const newAttributeValue = _value instanceof Function ? _value.apply(scope) : _value;
    /* Dev */
    // _DevLogger_("RENDER", "ATTRIBUTES", target, newAttributeValue);
    if (typeof newAttributeValue === "boolean") {
        element[target] = newAttributeValue;
    }
    else if (attributesThatAreProperties.includes(target)) {
        const value = typeof newAttributeValue === "string"
            ? deBracer(newAttributeValue, scope, "Render - binding property")
            : newAttributeValue;
        // ===
        /*
            For this specific case (setting value on <select> elements).
            The value property does not apply if the option for that value does not exist as a child of the select.
            Therefore the value has to be set after adding the options, which we can do here by waiting until the stack has finished).
          */
        if (target === "value" && element instanceof HTMLSelectElement) {
            setTimeout(() => {
                element[target] = value;
            }, 0);
        }
        // ===
        else if (value !== undefined) {
            element[target] = value;
        }
    }
    else if (newAttributeValue !== undefined &&
        newAttributeValue !== false &&
        newAttributeValue !== null) {
        element.setAttribute(target, deBracer(newAttributeValue, scope, `Render - binding attribute - (${target}), (${newAttributeValue})`));
    }
};

const renderStringAttribute = (element, key, value, scope) => {
    if (typeof value === "boolean") {
        element[key] = value;
    }
    else {
        const newAttributeValue = deBracer(value, scope, `Render - string attribute (${key}), (${value})`);
        element.setAttribute(key, newAttributeValue);
    }
};

const setAttribute$1 = (element, key, value, orderedAttributes, attributes, scope) => {
    /* Dev */
    // _DevLogger_("RENDER", "SETATTRIBUTE", key, "|", value, [element]);
    // ** Events are attributes defined like: "(attr)".
    const isEvent = isAttrType(key, "(", ")");
    if (isEvent) {
        renderEventAttributes(element, key, value, orderedAttributes, attributes, scope);
    }
    // ** Value binding attributes are defined like "[attr]".
    const isValueBinding = isAttrType(key, "[", "]");
    if (isValueBinding) {
        renderBindingAttributes(element, key, value, scope);
    }
    {
        const isNormal = !isEvent && !isValueBinding;
        if (isNormal) {
            renderStringAttribute(element, key, value, scope);
        }
    }
};
const renderAttributes = (element, orderedAttributes, attributes, scope) => {
    /* DEV */
    // _DevLogger_("RENDER", "ATTRIBUTES", orderedAttributes, { element });
    if (orderedAttributes === null)
        return;
    // <@ REMOVE FOR PRODUCTION
    if (orderedAttributes === undefined)
        throw new Error(`${MINT_ERROR} Attributes cannot be undefined, only null or object`);
    // @>
    // ** Loop over the attributes and add them in turn.
    // ** "set" here refers to all the different types of attributes.
    // ** We clone the attributes here so that the loop will retain the full list of attributes
    // ** even if some are removed during the processing.
    for (let key of [...orderedAttributes]) {
        const value = attributes[key];
        // ** If the attribute here is a mint attribute then ignore that attribute.
        if (attributesToIgnore.includes(key))
            continue;
        // ** If the value is undefined, that is acceptable but no attribute will be added.
        if (value === undefined)
            continue;
        setAttribute$1(element, key, value, orderedAttributes, attributes, scope);
    }
};

const renderComponentBlueprint = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    /* Dev */
    // _DevLogger_("RENDER", "COMPONENT", blueprint);
    var _a, _b, _c, _d, _e;
    const { element, orderedAttributes, attributes, scope, collection, childBlueprints, } = blueprint;
    // ** LIFECYCLE CALL
    (_a = scope.oninit) === null || _a === void 0 ? void 0 : _a.call(scope, { scope });
    (_b = scope.oninsert) === null || _b === void 0 ? void 0 : _b.call(scope, { scope });
    (_c = scope.oneach) === null || _c === void 0 ? void 0 : _c.call(scope, { scope });
    if (element !== undefined) {
        renderAttributes(element, orderedAttributes, attributes, scope);
    }
    // ** Here we add the Component Element to the parentElement, if there is a Component Element.
    if (element !== undefined) {
        addElement(element, parentElement, parentChildBlueprints, blueprintIndex);
    }
    // ** Here we add the collection of Component Elements if there is a collection.
    if (collection !== undefined) {
        for (let x of collection) {
            renderBlueprints([x], parentElement, parentChildBlueprints, [
                blueprintIndex,
            ]);
        }
    }
    // ** Here we handle the children of this Component, if it has any.
    if (!!childBlueprints) {
        renderBlueprints(childBlueprints, element !== null && element !== void 0 ? element : parentElement);
    }
    // ** LIFECYCLE CALL
    (_d = scope.onafterinsert) === null || _d === void 0 ? void 0 : _d.call(scope, { scope });
    (_e = scope.onaftereach) === null || _e === void 0 ? void 0 : _e.call(scope, { scope });
    return;
};

// ** It's not super easy to reason how to get the parentBlueprint of
// ** of a Blueprint and so we put that logic here.
const getParentElement = (blueprint) => {
    const { parentBlueprint } = blueprint;
    const { _rootElement } = blueprint._rootScope;
    if (parentBlueprint === null)
        return _rootElement;
    const { element } = parentBlueprint;
    if (element !== undefined)
        return element;
    return getParentElement(parentBlueprint);
};

const refreshBlueprint = (blueprint, options) => {
    const parentElement = getParentElement(blueprint);
    /* Dev */
    // _DevLogger_("REFRESH", "Blueprint", blueprint);
    const focusTarget = document.activeElement;
    if (blueprint.mintNode === null) {
        if (blueprint.refresh) {
            blueprint.refresh(blueprint, { newlyInserted: options.newlyInserted });
        }
        return;
    }
    const _refresh = blueprint.mintNode.refresh;
    _refresh(blueprint, parentElement, options);
    // ** Here we check if the Element that was refreshed was the activeElement (had focus).
    // ** If it was then we re add the focus if it has been lost.
    if (focusTarget !== null &&
        focusTarget !== document.activeElement &&
        document.body.contains(focusTarget)) {
        focusTarget.focus();
    }
};
const refreshBlueprints = (blueprints, options) => {
    for (let blueprint of blueprints) {
        refreshBlueprint(blueprint, options);
    }
};

const getOldValue = (target, element) => {
    if (attributesThatAreProperties.includes(target)) {
        return element[target];
    }
    return element.getAttribute(target);
};
const refreshBindingAttributes = (element, key, value, scope) => {
    const target = key.substring(1, key.length - 1);
    const oldAttributeValue = getOldValue(target, element);
    const _value = resolvePropertyLookup(value, scope);
    const newAttributeValue = _value instanceof Function ? _value.apply(scope) : _value;
    if (oldAttributeValue === newAttributeValue) {
        return;
    }
    if (typeof newAttributeValue === "boolean") {
        element[target] = newAttributeValue;
    }
    else if (attributesThatAreProperties.includes(target)) {
        const value = typeof newAttributeValue === "string"
            ? deBracer(newAttributeValue, scope, "Refresh - binding property")
            : newAttributeValue;
        // ===
        /*
            For this specific case (setting value on <select> elements).
            The value property does not apply if the option for that value does not exist as a child of the select.
            Therefore the value has to be set after adding the options, which we can do here by waiting until the stack has finished).
          */
        if (target === "value" && element instanceof HTMLSelectElement) {
            setTimeout(() => {
                element[target] = value;
            }, 0);
        }
        // ===
        // ===
        /*
          For the case where the property needs to be set as a boolean but is not a boolean value
          do that here.
          For example setting checked on Input type checkbox.1
        */
        else if (attributesThatAreBoolean.includes(target)) {
            element[target] = !!value;
        }
        // ===
        else if (value !== undefined) {
            element[target] = value;
        }
    }
    else if (newAttributeValue === undefined || newAttributeValue === null) {
        element.removeAttribute(target);
    }
    else {
        element.setAttribute(target, deBracer(newAttributeValue, scope, "Refresh - binding attribute"));
    }
};

const refreshStringAttribute = (element, key, value, scope) => {
    const oldAttributeValue = element.getAttribute(key);
    if (oldAttributeValue === value) {
        return;
    }
    if (typeof value === "boolean") {
        element[key] = value;
    }
    else if (value === undefined) {
        element.removeAttribute(key);
    }
    else {
        const newAttributeValue = deBracer(value, scope, "Refresh - string attribute");
        if (oldAttributeValue === newAttributeValue) {
            return;
        }
        element.setAttribute(key, newAttributeValue);
    }
};

const setAttribute = (element, key, value, scope) => {
    /* Dev */
    // _DevLogger_("REFRESH", "SETATTRIBUTE: ", key, "|", value);
    if (isAttrType(key, "(", ")")) {
        console.error("Event handler attribute was present in refresh");
        console.trace();
    }
    if (isAttrType(key, "[", "]")) {
        refreshBindingAttributes(element, key, value, scope);
    }
    else {
        refreshStringAttribute(element, key, value, scope);
    }
};
const refreshAttributes = (element, orderedAttributes, attributes, scope) => {
    /* DEV */
    // _DevLogger_("REFRESH", "ATTRIBUTES: ", orderedAttributes, { element });
    for (let key of orderedAttributes) {
        const value = attributes[key];
        if (attributesToIgnore.includes(key))
            continue;
        setAttribute(element, key, value, scope);
    }
};

const resolveMAttributesOnRefresh = (blueprint, parentElement, options) => {
    const { orderedProps = [], props = {}, orderedAttributes = [], attributes = {} } = blueprint;
    let shouldExit = { condition: false, value: undefined };
    for (let key of orderedProps) {
        const property = props[key];
        const resolver = property.onRefresh;
        if (shouldExit.condition === false && property instanceof MintAttribute && resolver instanceof Function) {
            shouldExit = resolver.apply(property, [blueprint, parentElement, options]);
        }
    }
    for (let key of orderedAttributes) {
        const property = attributes[key];
        const resolver = property.onRefresh;
        if (shouldExit.condition === false && property instanceof MintAttribute && resolver instanceof Function) {
            shouldExit = resolver.apply(property, [blueprint, parentElement, options]);
        }
    }
    return shouldExit;
};

const refreshComponentBlueprint = (blueprint, parentElement, options) => {
    /* Dev */
    // _DevLogger_("REFRESH", "COMPONENT: ", blueprint);
    var _a, _b, _c, _d, _e;
    const { element, orderedProps, props, orderedAttributes, attributes, scope, parentBlueprint, collection, childBlueprints, } = blueprint;
    applyScopeTransformers(scope);
    {
        const parentScope = (_a = parentBlueprint === null || parentBlueprint === void 0 ? void 0 : parentBlueprint.scope) !== null && _a !== void 0 ? _a : blueprint._rootScope;
        assignProps(scope, orderedProps, props, parentScope);
    }
    const shouldReturn = resolveMAttributesOnRefresh(blueprint, parentElement, options);
    if (shouldReturn.condition) {
        return shouldReturn;
    }
    // ** LIFECYCLE CALL
    options.newlyInserted && ((_b = scope.oninsert) === null || _b === void 0 ? void 0 : _b.call(scope, { scope }));
    (_c = scope.oneach) === null || _c === void 0 ? void 0 : _c.call(scope, { scope });
    if (element !== undefined && !(element instanceof Text)) {
        refreshAttributes(element, orderedAttributes, attributes, scope);
    }
    if (!!collection) {
        refreshBlueprints(collection, options);
    }
    if (!!childBlueprints) {
        refreshBlueprints(childBlueprints, options);
    }
    // ** LIFECYCLE CALL
    options.newlyInserted && ((_d = scope.onafterinsert) === null || _d === void 0 ? void 0 : _d.call(scope, { scope }));
    (_e = scope.onaftereach) === null || _e === void 0 ? void 0 : _e.call(scope, { scope });
    return shouldReturn;
};

class MintComponent extends MintNode {
    constructor(element, attributes, content, scope) {
        super(content, generateComponentBlueprint, renderComponentBlueprint, refreshComponentBlueprint);
        this.element = element;
        this.attributes = attributes !== null && attributes !== void 0 ? attributes : {};
        this.scope = scope;
        if (scope === null || scope === void 0 ? void 0 : scope._propTypes) {
            this.propTypes = scope._propTypes;
        }
    }
    clone() {
        var _a;
        const content = [];
        for (let x of this.content) {
            content.push(cloneContent(x));
        }
        const cloned = new MintComponent((_a = this.element) !== null && _a !== void 0 ? _a : "<>", Object.assign({}, this.attributes), content, this.scope);
        return cloned;
    }
}

const component = (element, scope = null, attributes = null, initialContent = null) => {
    // <@ REMOVE FOR PRODUCTION
    if (element === "<>" && typeof initialContent === "string") {
        throw new Error(`${MINT_ERROR} Cannot define content as 'string' when Component is a Fragment (<>).`);
    }
    // @>
    // <@ REMOVE FOR PRODUCTION
    if (!!(attributes === null || attributes === void 0 ? void 0 : attributes.mIf)) {
        throw new Error(`${MINT_ERROR} Cannot add mIf directly to Components attribute in Component definition.`);
    }
    // @>
    // <@ REMOVE FOR PRODUCTION
    if (!!(attributes === null || attributes === void 0 ? void 0 : attributes.mFor)) {
        throw new Error(`${MINT_ERROR} Cannot add mFor directly to Components attribute in Component definition.`);
    }
    // @>
    const content = createMintText(initialContent);
    return new MintComponent(element, attributes, content, scope);
};

class TemplateBlueprint extends Blueprint {
    constructor({ mintNode, fragment, templateState, scope, parentBlueprint, _rootScope, }) {
        super({
            mintNode,
            scope,
            parentBlueprint,
            _rootScope,
        });
        if (!!fragment)
            this.fragment = fragment;
        this.templateState = templateState;
        this._dev = "Template";
    }
}

const generateMTemplate = ({ node, scope, parentBlueprint, _rootScope }) => {
    const { mintNode } = node;
    const mintTemplate = mintNode;
    return new TemplateBlueprint({
        mintNode: mintTemplate,
        templateState: null,
        scope,
        parentBlueprint,
        _rootScope
    });
};

const renderMTemplate = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    const { mintNode, scope, parentBlueprint, _rootScope } = blueprint;
    let { options, templateGenerator, scopeLookup } = mintNode;
    if (scopeLookup !== undefined) {
        templateGenerator = scope[scopeLookup];
        // <@ REMOVE FOR PRODUCTION
        if (!(templateGenerator instanceof Function)) {
            throw new Error(`${MINT_ERROR} -- node(template("target")) -- No function provided from "target". Make sure you write () => TMintContent not just TMintContent`);
        }
        // @>
    }
    const { conditionedBy } = options;
    blueprint.templateState = conditionedBy && scope[conditionedBy];
    const template = templateGenerator.apply(scope);
    let content;
    if (template instanceof Array) {
        content = template;
    }
    else {
        content = [template];
    }
    const collection = generateBlueprints({
        nodes: content,
        scope,
        parentBlueprint,
        _rootScope,
    });
    // <@ REMOVE FOR PRODUCTION
    if (!!collection.find((x) => x instanceof TextBlueprint && x.textValue === "_children")) {
        throw new Error(`${MINT_ERROR} cannot add "_children" as a child of mTemplate template.`);
    }
    // @>
    for (let x of collection) {
        renderBlueprints([x], parentElement, parentChildBlueprints, [
            blueprintIndex,
        ]);
    }
    blueprint.collection = collection;
};

const getAllElements = (blueprints) => {
    const allElements = [];
    for (let x of blueprints) {
        if (x.element instanceof Element) {
            allElements.push(x.element);
            continue;
        }
        if (x.collection instanceof Array) {
            allElements.push(...getAllElements(x.collection));
            continue;
        }
    }
    return allElements;
};

const fillOutElements = (blueprintList, initialBlueprint) => {
    const output = [];
    const a = output;
    for (let x of blueprintList) {
        const b = x;
        if (b !== initialBlueprint && b.fragment) {
            if (!!b.childBlueprints) {
                a.push(...fillOutElements(b.childBlueprints, initialBlueprint));
            }
            if (!!b.collection) {
                a.push(...fillOutElements(b.collection, initialBlueprint));
            }
        }
        else {
            a.push(b);
        }
    }
    return output;
};
// ** Here we take a Blueprint and find the index among the parent content so that
// ** we can insert the Blueprint content correctly amongst it.
const getBlueprintIndex = (blueprint, initialBlueprint = blueprint) => {
    const { parentBlueprint } = blueprint;
    const { _rootChildBlueprints } = blueprint._rootScope;
    let blueprintList, blueprintIndex;
    if (parentBlueprint === null) {
        blueprintList = fillOutElements(_rootChildBlueprints, initialBlueprint);
        blueprintIndex = _rootChildBlueprints.indexOf(blueprint);
        return { blueprintList, blueprintIndex };
    }
    const { fragment, collection, childBlueprints } = parentBlueprint;
    if (fragment) {
        return getBlueprintIndex(parentBlueprint, initialBlueprint);
    }
    if (childBlueprints !== undefined) {
        blueprintList = childBlueprints;
    }
    if (collection !== undefined) {
        blueprintList = collection;
    }
    blueprintList = fillOutElements(blueprintList, initialBlueprint);
    blueprintIndex = blueprintList.indexOf(initialBlueprint);
    /* DEV */
    // _DevLogger_("REFRESH", "INDEX", blueprint, blueprintIndex);
    return { blueprintList, blueprintIndex };
};

const conductRefresh = (blueprint) => {
    var _a;
    const { collection } = blueprint;
    const parentElement = getParentElement(blueprint);
    const { blueprintList: parentBlueprintList, blueprintIndex } = getBlueprintIndex(blueprint);
    const allElements = getAllElements(collection);
    for (let x of allElements) {
        (_a = x.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(x);
    }
    renderMTemplate(blueprint, parentElement, parentBlueprintList, blueprintIndex);
};
const refreshMTemplate = (blueprint) => {
    const { collection, scope, templateState, mintNode } = blueprint;
    const { options: { conditionedBy, onevery }, } = mintNode;
    // ** If there is no content to add; DO NOTHING
    if (collection === undefined)
        return { condition: false };
    // ** If we want to refresh every time then DO that here and end.
    if (onevery === true) {
        conductRefresh(blueprint);
        return { condition: false };
    }
    if (conditionedBy !== undefined) {
        const newTemplateState = resolvePropertyLookup(conditionedBy, scope);
        // ** If the conditional state hasn't changed: DO NOTHING
        if (templateState === newTemplateState)
            return { condition: false };
        // ** Update the state for next time.
        blueprint.templateState = newTemplateState;
        conductRefresh(blueprint);
        return { condition: false };
    }
    return { condition: false };
};

class MintTemplate extends MintNode {
    constructor(optionsOrGeneratorOrScopeLookup, templateGeneratorOrScopeLookup) {
        super(null, generateMTemplate, renderMTemplate, refreshMTemplate);
        if (templateGeneratorOrScopeLookup !== undefined) {
            this.options = optionsOrGeneratorOrScopeLookup;
            if (typeof templateGeneratorOrScopeLookup === "string") {
                this.scopeLookup = templateGeneratorOrScopeLookup;
            }
            else {
                this.templateGenerator = templateGeneratorOrScopeLookup;
            }
        }
        else {
            this.options = {
                onevery: true,
            };
            if (typeof optionsOrGeneratorOrScopeLookup === "string") {
                this.scopeLookup = optionsOrGeneratorOrScopeLookup;
            }
            else {
                this.templateGenerator = optionsOrGeneratorOrScopeLookup;
            }
        }
    }
    addChildren() { }
    addProperties() { }
}

const template = (optionsOrGenerator, templateGenerator) => {
    return new MintTemplate(optionsOrGenerator, templateGenerator);
};

class ContextBlueprint extends Blueprint {
    constructor({ mintNode, scope, parentBlueprint, _rootScope }) {
        super({ mintNode, scope, parentBlueprint, _rootScope });
        this.fragment = true;
    }
}

const generateMContext = ({ node, scope, parentBlueprint, _rootScope }) => {
    const { mintNode } = node;
    const mintContext = mintNode;
    if (!scope._mintBlueprint.contexts) {
        scope._mintBlueprint.contexts = {};
    }
    Object.assign(scope._mintBlueprint.contexts, mintContext.contexts);
    const blueprint = new ContextBlueprint({ mintNode: mintContext, scope, parentBlueprint, _rootScope });
    return blueprint;
};

const renderMContext = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    const { mintNode, scope, parentBlueprint, _rootScope } = blueprint;
    const { collection: content } = mintNode;
    const collection = generateBlueprints({
        nodes: content,
        scope,
        parentBlueprint,
        _rootScope
    });
    for (let x of collection) {
        renderBlueprints([x], parentElement, parentChildBlueprints, [blueprintIndex]);
    }
    blueprint.collection = collection;
};

class MintContext extends MintNode {
    constructor(contexts, initialContent) {
        super(null, generateMContext, renderMContext);
        this.contexts = contexts;
        const collection = createMintText(initialContent);
        this.collection = collection;
    }
    addChildren() { }
    addProperties() { }
}

const context = (contexts, content) => {
    return new MintContext(contexts, content);
};

class ElementBlueprint extends Blueprint {
    constructor({ mintNode, fragment, element, orderedAttributes, attributes, scope, parentBlueprint, _rootScope, collection, childBlueprints, }) {
        super({
            mintNode,
            scope,
            parentBlueprint,
            _rootScope,
        });
        if (!!fragment)
            this.fragment = fragment;
        if (!!element)
            this.element = element;
        this.orderedAttributes = orderedAttributes;
        this.attributes = attributes;
        if (!!collection)
            this.collection = collection;
        if (!!childBlueprints)
            this.childBlueprints = childBlueprints;
        if (element instanceof SVGElement)
            this.isSVG = true;
        this._dev = "Element";
    }
}

const generateElementBlueprint = ({ node, orderedProps: orderedAttributes, props: attributes, scope, parentBlueprint, _rootScope, isSVG, }) => {
    // ** This Function can only be accessed  by MintElement so tell TS that here.
    const mintElement = node.mintNode;
    const { element, content } = mintElement;
    // ** We to check for SVG, which we do here.
    // ** Child Elements of SVG are all SVG Elements as well so it stays true from here downwards.
    element === "svg" && (isSVG = true);
    let newHTMLElement = undefined;
    // ** Check for Fragments.
    if (element !== undefined && element !== "<>") {
        // ** Create the new Element in JS
        // ** SVG Elements are slightly different and are created differently here.
        newHTMLElement = isSVG
            ? // ** An SVGElement is different to a HTMLElement, it is older and needs a different method to be created.
                document.createElementNS("http://www.w3.org/2000/svg", element)
            : // ** Create a new HTMLElment.
                document.createElement(element);
    }
    {
        // ** Here we resolve the attributes of the element.
        // ** If one of the mAttributes on the list means we stop generating here then detect that.
        const shouldReturn = resolveMAttributesOnGenerate({
            orderedProps: orderedAttributes !== null && orderedAttributes !== void 0 ? orderedAttributes : [],
            props: attributes !== null && attributes !== void 0 ? attributes : {},
            htmlElement: newHTMLElement,
            node,
            parentScope: scope,
            scope,
            _children: null,
            parentBlueprint,
            _rootScope,
            isSVG,
            isComponent: false,
            isAttribute: true,
        });
        if (shouldReturn.condition) {
            return shouldReturn.value;
        }
    }
    const blueprint = new ElementBlueprint({
        mintNode: mintElement,
        fragment: element === "<>" || undefined,
        element: newHTMLElement,
        orderedAttributes: orderedAttributes !== null && orderedAttributes !== void 0 ? orderedAttributes : [],
        attributes: attributes !== null && attributes !== void 0 ? attributes : {},
        scope,
        parentBlueprint,
        _rootScope,
    });
    /* Dev */
    // _DevLogger_("GENERATE", "ELEMENT", blueprint);
    const _childBlueprints = [];
    // ** Here we produce the content of the children of this Element.
    if (content !== undefined) {
        _childBlueprints.push(...generateBlueprints({
            nodes: content,
            scope,
            parentBlueprint: blueprint,
            _rootScope,
            isSVG,
        }));
    }
    // ** Check if the children content contains the "_children" keyword.
    // ** Using this allows the content of this child blueprint to use custom content passed into this parent Component.
    // ** E.g
    /*
      const Sub = component("div", null, null, "_children");
      const Main = component("main", null, null, element(Sub, null, "Content"));
  
      Produces:
  
      <main>
        <div>Content</div>
      </main>
    */
    const childBlueprints = resolveChildBlueprints(blueprint, _childBlueprints, isSVG);
    if (element === "<>") {
        blueprint.collection = childBlueprints;
    }
    else {
        blueprint.childBlueprints = childBlueprints;
    }
    checkForErrorsOnBlueprint(blueprint);
    return blueprint;
};

const renderElementBlueprint = (blueprint, parentElement, parentChildBlueprints, blueprintIndex) => {
    const { element, orderedAttributes, attributes, scope, collection, childBlueprints, } = blueprint;
    /* Dev */
    // _DevLogger_("RENDER", "ELEMENT", blueprint, blueprintIndex);
    if (element !== undefined) {
        renderAttributes(element, orderedAttributes, attributes, scope);
    }
    // ** Here we add the Element to the parentElement, if there is an Element.
    if (element !== undefined) {
        addElement(element, parentElement, parentChildBlueprints, blueprintIndex);
    }
    // ** Here we add the collection of Elements if there is a collection.
    if (collection !== undefined) {
        for (let x of collection) {
            renderBlueprints([x], parentElement, parentChildBlueprints, [
                blueprintIndex,
            ]);
        }
    }
    // ** Here we handle the children of this Element, if it has any.
    if (!!childBlueprints) {
        renderBlueprints(childBlueprints, element !== null && element !== void 0 ? element : parentElement);
    }
};

const refreshElementBlueprint = (blueprint, parentElement, options) => {
    /* Dev */
    // _DevLogger_("REFRESH", "ELEMENT", blueprint);
    const { element, collection, orderedAttributes, attributes, scope, childBlueprints, } = blueprint;
    const shouldReturn = resolveMAttributesOnRefresh(blueprint, parentElement, options);
    if (shouldReturn.condition) {
        return shouldReturn;
    }
    if (element !== undefined && !(element instanceof Text)) {
        refreshAttributes(element, orderedAttributes, attributes, scope);
    }
    if (!!collection) {
        refreshBlueprints(collection, options);
    }
    if (!!childBlueprints) {
        refreshBlueprints(childBlueprints, options);
    }
    return shouldReturn;
};

class MintElement extends MintNode {
    constructor(element, 
    // props: null | IProps = null,
    attributes = null, content) {
        super(content, generateElementBlueprint, renderElementBlueprint, refreshElementBlueprint);
        this.element = element;
        // this.props = props ?? {};
        this.attributes = attributes !== null && attributes !== void 0 ? attributes : {};
    }
    clone() {
        var _a;
        const content = [];
        for (let x of this.content) {
            content.push(cloneContent(x));
        }
        return new MintElement((_a = this.element) !== null && _a !== void 0 ? _a : "<>", 
        // Object.assign({}, this.props),
        Object.assign({}, this.attributes), content);
    }
}

function node(element, props = null, initialContent = null) {
    // export const node = <T extends Object>(
    //   element: string | MintComponent | MintTemplate,
    //   props: null | (T & IProps) = null,
    //   initialContent: null | TRawContent = null
    // ): CreateNode<T, MintElement | MintComponent | MintTemplate> => {
    // <@ REMOVE FOR PRODUCTION
    if (element === "<>" && props !== null) {
        const acceptableProps = ["mIf", "mFor", "mKey"];
        const keys = [];
        for (let x of Object.keys(props)) {
            if (!acceptableProps.includes(x))
                keys.push(x);
        }
        if (keys.length > 0) {
            console.warn(`${MINT_WARN} Defining a Fragment with attributes i.e node("<>", { ${keys.join(", ")} }) means these attributes will be ignored on render.`);
        }
    }
    // @>
    let mintNode;
    const content = createMintText(initialContent);
    if (typeof element === "string") {
        mintNode = new MintElement(element, props, content);
    }
    else {
        mintNode = element;
        // (element as MintComponent)._children = content;
    }
    return new CreateNode(mintNode, props, content);
}

const resolvePropTypes = (orderedProps, props, mintComponent, parentScope) => {
    var _a;
    // ** If this Component does not have defined propTypes then we do nothing.
    const { propTypes } = mintComponent;
    if (propTypes === undefined)
        return;
    const name = (_a = mintComponent.scope) === null || _a === void 0 ? void 0 : _a.name;
    // ** Get all the binding props (e.g [prop]="value").
    const propsList = [];
    for (let prop of orderedProps) {
        if (isAttrType(prop, "[", "]")) {
            const key = prop.substring(1, prop.length - 1);
            propsList.push({ key, prop, value: props[prop] });
        }
        else {
            propsList.push({ key: prop, prop, value: props[prop] });
        }
    }
    // ** Define this easier by removing the square brackets (e.g [prop]="value" becomes {prop,value}).
    // ** Loop over the binding props.
    for (let { key, prop, value } of propsList) {
        // ** As the value could be undefined, we do nothing here.
        if (value === undefined)
            return;
        // ** Get the accepted types to compare to the provided type.
        const propType = propTypes[key];
        // ** If the type is "any" then we do nothing.
        if (propType === "any")
            return;
        // ** Get the type of the value that will be used.
        const parentType = typeof parentScope[value];
        // ** If this type is not of the accepted list of types then we should the user a warning.
        if (!propType.includes(parentType)) {
            const _types = [];
            for (let x of propType) {
                _types.push(`"${x}"`);
            }
            const types = _types.join(" | ");
            console.warn(`${MINT_WARN} Prop types clash. Component: ${name}. Prop: ${prop}. Incorrect type: ${parentType}. Allowed types: ${types}`);
        }
    }
};

class Store {
    constructor(initialData) {
        if (!(initialData instanceof Object)) {
            throw "You must provide an Object to create a new Store.";
        }
        const entries = Object.entries(initialData);
        for (let [key, value] of entries) {
            if (value instanceof ScopeTransformer) {
                value.transform(this, key);
            }
            else {
                this[key] = value;
            }
        }
        this._component = null;
        this._keys = Object.keys(initialData);
        this._data = initialData;
        Object.seal(this);
    }
    connect(scope) {
        this._component = scope;
        scope._store = this;
        for (let key of this._keys) {
            const value = this._data[key];
            if (value instanceof ScopeTransformer) {
                value.transform(scope, key);
            }
            else {
                Object.defineProperty(scope, key, {
                    get: () => this[key],
                    set: (_value) => (this[key] = _value),
                });
            }
        }
    }
}

const externalRefreshBlueprint = (scopeOrBlueprint) => {
    var _a;
    const blueprint = scopeOrBlueprint instanceof Blueprint
        ? scopeOrBlueprint
        : scopeOrBlueprint instanceof Store
            ? (_a = scopeOrBlueprint._component) === null || _a === void 0 ? void 0 : _a._mintBlueprint
            : scopeOrBlueprint._mintBlueprint;
    // <@ REMOVE FOR PRODUCTION
    if (blueprint === undefined) {
        throw new Error(`${MINT_ERROR} refresh called using an invalid scope. Blueprint is undefined.`);
    }
    // @>
    if (currentlyTracking.updating(blueprint)) {
        console.warn(`${MINT_WARN} refresh() detected while still templating, refresh ignored.`);
        return;
    }
    currentlyTracking.addBlueprint(blueprint);
    refreshBlueprints([blueprint], { newlyInserted: false });
    currentlyTracking.removeBlueprint(blueprint);
};
const externalRefresh = (target) => {
    let arr = [];
    /* Dev */
    // _DevLogger_("REFRESH: ", "target", target);
    if (!(target instanceof Array)) {
        arr = [target];
    }
    else {
        arr = target;
    }
    for (let each of arr) {
        externalRefreshBlueprint(each);
    }
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const generateMExtend = ({ extension, orderedProps, props, parentScope, scope, }) => {
    // ** Here we use the "mExtend" tool to extract an Object from the scope and extend the
    // ** attributes used in the Render of that Element.
    const _extension = typeof extension === "string" ? parentScope[extension] : extension;
    //<@ REMOVE FOR PRODUCTION
    if (!(_extension instanceof Object)) {
        throw new Error("Render -- Element -- mExtend -- Something other than an Object was set on mExtend.");
    }
    //@>
    // ** Set the values here.
    for (let [key, value] of Object.entries(_extension)) {
        //<@ REMOVE FOR PRODUCTION
        if (key === "mExtend") {
            throw new Error("Render -- Element -- mExtend -- Property of mExtend found on extension object. This will cause a cyclicular error.");
        }
        //@>
        orderedProps.push(key);
        props[key] = value;
    }
    assignProps(scope, Object.keys(_extension), _extension, parentScope);
    return {
        condition: false,
        value: undefined,
    };
};

class MintExtend extends MintAttribute {
    constructor(extension) {
        super(() => new MintExtend(extension));
        this.extension = extension;
        this.onGenerate = function (_a) {
            var args = __rest(_a, []);
            const { extension } = this;
            return generateMExtend(Object.assign({ extension }, args));
        };
    }
}

const mExtend = (extension) => {
    return { mExtend: new MintExtend(extension) };
};

class IfBlueprint extends Blueprint {
    constructor({ mintNode, orderedProps, props, scope, parentBlueprint, _rootScope, content, isSVG, }) {
        super({
            mintNode,
            scope,
            parentBlueprint,
            _rootScope,
        });
        this.orderedProps = orderedProps;
        this.props = props;
        this.content = content;
        if (!!isSVG)
            this.isSVG = isSVG;
        this._dev = "If";
    }
}

const generateMIf = ({ mIfInstance, _ifValue, node, orderedProps, props, parentScope, parentBlueprint, _rootScope, isSVG, }) => {
    const { mintNode, content } = node;
    const mintElement = mintNode;
    // <@ REMOVE FOR PRODUCTION
    if (_ifValue.includes(" ")) {
        console.warn(`${MINT_WARN} mIf value defined with a space, this may be a mistake. Value: "${_ifValue}".`);
    }
    // @>
    if (mIfInstance._mIf !== undefined) {
        throw new Error("");
    }
    const inverse = _ifValue.charAt(0) === "!";
    const ifValue = inverse ? _ifValue.substring(1) : _ifValue;
    const result = resolvePropertyLookup(ifValue, parentScope);
    const state = inverse ? !result : !!result;
    mIfInstance._mIf = {
        inverse,
        ifValue,
        state,
        scope: parentScope,
        blueprinted: state,
        mintNode: mintNode,
    };
    /* Dev */
    // _DevLogger_("GENERATE", "mIf", mIfInstance._mIf);
    if (mIfInstance._mIf.state === false) {
        mIfInstance.blueprint = new IfBlueprint({
            mintNode: mintElement,
            orderedProps,
            props: props !== null && props !== void 0 ? props : {},
            scope: parentScope,
            parentBlueprint,
            _rootScope,
            content,
            isSVG,
        });
        /* Dev */
        // _DevLogger_("GENERATE", "mIf", that.blueprint, parentBlueprint);
        return { condition: true, value: mIfInstance.blueprint };
    }
    return { condition: false, value: undefined };
};

// ** This function takes a list of Blueprints and remove their content from
// ** their parent HTMLElement.
const removeList = (list) => {
    var _a;
    for (let x of list) {
        const { element, collection } = x;
        if (element !== undefined) {
            (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
        }
        if (collection !== undefined) {
            removeList(collection);
        }
    }
};

const resolveState = (mIf) => {
    const { ifValue, inverse, scope } = mIf;
    const result = resolvePropertyLookup(ifValue, scope);
    return inverse ? !result : !!result;
};
const fromFalseNotBlueprintedToTrue = (blueprint, parentElement, options) => {
    let newBlueprint = blueprint;
    const { mIf, newState, newlyInserted } = options;
    const ifBlueprint = blueprint;
    const { _rootScope } = blueprint;
    const { mintNode, parentBlueprint, scope, isSVG } = ifBlueprint;
    const cloneMintContent = new CreateNode(mintNode, ifBlueprint.props, ifBlueprint.content);
    [newBlueprint] = generateBlueprints({
        nodes: [cloneMintContent],
        scope,
        parentBlueprint,
        _rootScope,
        isSVG,
    });
    // ** We need to replace this previous IfBlueprint as its not longer the correct context.
    if (parentBlueprint !== null) {
        // ** When not at root element
        const { childBlueprints, collection } = parentBlueprint;
        if (childBlueprints !== undefined) {
            // ** Child blueprints
            let index = -1;
            for (let [i, x] of childBlueprints.entries()) {
                if (x === ifBlueprint) {
                    index = i;
                }
            }
            childBlueprints.splice(index, 1, newBlueprint);
        }
        if (collection !== undefined) {
            // ** Collection
            let index = -1;
            for (let [i, x] of collection.entries()) {
                if (x === ifBlueprint) {
                    index = i;
                }
            }
            collection.splice(index, 1, newBlueprint);
        }
    }
    else {
        // ** When at root element.
        const { _rootChildBlueprints } = blueprint._rootScope;
        let index = -1;
        for (let [i, x] of _rootChildBlueprints.entries()) {
            if (x === ifBlueprint) {
                index = i;
            }
        }
        _rootChildBlueprints.splice(index, 1, newBlueprint);
    }
    mIf.blueprinted = true;
    const { blueprintList, blueprintIndex } = getBlueprintIndex(newBlueprint);
    parentElement !== undefined &&
        renderBlueprints([newBlueprint], parentElement, blueprintList, [
            blueprintIndex,
        ]);
    return { newState, newlyInserted };
};
const fromFalseToTrue = (blueprint, parentElement, parentBlueprintList, blueprintIndex) => {
    const { element, collection } = blueprint;
    if (element !== undefined) {
        addElement(element, parentElement, parentBlueprintList, blueprintIndex);
    }
    if (collection !== undefined) {
        for (let x of collection) {
            renderBlueprints([x], parentElement, parentBlueprintList, [
                blueprintIndex,
            ]);
        }
    }
};
const fromTrueToFalse = (blueprint) => {
    removeList([blueprint]);
};
const stateShift = (blueprint, parentElement, parentBlueprintList, blueprintIndex, mIf) => {
    if (mIf === undefined)
        return {};
    const oldState = mIf.state;
    mIf.state = resolveState(mIf);
    const newState = mIf.state;
    let newlyInserted = false;
    /* Dev */
    // _DevLogger_("REFRESH", "mIf: ", mIf, oldState, newState);
    // ** Change in state -> Do something
    if (oldState !== newState) {
        // ** Is now TRUE
        if (newState === true) {
            newlyInserted = true;
            // ** WAS NOT previously rendered -> Add
            if (mIf.blueprinted === false) {
                // ** WAS NOT previously blueprinted -> Blueprint first, then Add
                return fromFalseNotBlueprintedToTrue(blueprint, parentElement, {
                    mIf,
                    newState,
                    newlyInserted,
                });
            }
            else {
                // ** WAS previously blueprinted -> Add back
                fromFalseToTrue(blueprint, parentElement, parentBlueprintList, blueprintIndex);
            }
        }
        // ** Is now FALSE
        else if (blueprint instanceof Blueprint) {
            // ** WAS previously rendered -> Remove
            fromTrueToFalse(blueprint);
        }
    }
    return { newState, newlyInserted };
};
const refreshMIf = (mIf, blueprint, parentElement, options) => {
    const { blueprintList: parentBlueprintList, blueprintIndex } = getBlueprintIndex(blueprint);
    const oldBlueprinted = mIf.blueprinted;
    const { newState, newlyInserted } = stateShift(blueprint, parentElement, parentBlueprintList, blueprintIndex, mIf);
    options.newlyInserted = newlyInserted !== null && newlyInserted !== void 0 ? newlyInserted : false;
    if (oldBlueprinted === false && newState === true) {
        return { condition: true, value: blueprint };
    }
    if (newState === false)
        return { condition: true, value: blueprint };
    return { condition: false, value: undefined };
};

const renderMIf = (blueprint, mIf) => {
    if (blueprint === null)
        return { condition: false, value: undefined };
    if (mIf.blueprinted === false && mIf.state === false) {
        return { condition: true, value: blueprint };
    }
    return { condition: false, value: undefined };
};

class MintIf extends MintAttribute {
    constructor(ifValue) {
        super(() => new MintIf(ifValue));
        this.onGenerate = function (_a) {
            var args = __rest(_a, []);
            const that = this;
            return generateMIf(Object.assign({ mIfInstance: that, _ifValue: ifValue }, args));
        };
        this.onRender = function (blueprint) {
            const { _mIf } = this;
            return renderMIf(blueprint, _mIf);
        };
        this.onRefresh = function (blueprint, parentElement, options) {
            const { _mIf } = this;
            return refreshMIf(_mIf, blueprint, parentElement, options);
        };
    }
}

const mIf = (ifValue) => {
    return { mIf: new MintIf(ifValue) };
};

//  ** Creates a function that will check against a property target and return if unique.
const checkUniqueService = (key) => {
    // ** item is an item in arr and arr is the full list of items.
    // ** index is the index of item in arr.
    return (item, index, arr) => {
        // ** This is IMPORTANT
        // ** When using the index we ignore checking for uniqueness because it will always be unique.
        if (key === "_i")
            return true;
        const value = item[key];
        {
            for (let [i, x] of arr.entries()) {
                // ** Find the first value on the arr that matches the provided value.
                if (x[key] === value) {
                    // ** If they are at the same index then alls fine.
                    if (index === i) {
                        return true;
                    }
                    // ** If the indexes are wrong it means that there is another value with
                    // ** the same value and therefore a duplicate and this is not unique.
                    else {
                        return false;
                    }
                }
            }
        }
        return false;
    };
};

/*
  This is a very important Function.
  When passing an Array of Objects to a mFor we need to go over the data of each
  Object and add the parent scope into the data.
  We do this by creating a new Object and adding the parent scope as the prototype.
  Importantly we then define the for each data using Object.defineProperty
  instead of newScope.property = value otherwise the parent would change instead,
  leaving the parent scope with the last Array property value and with each in the for
  using that property too.
*/
const createForData = (data, scope, index) => {
    const Data = function _ForData() {
        this._x = data;
        this._i = index;
    };
    Data.prototype = scope;
    const newScope = new Data();
    if (data instanceof Object) {
        const entries = Object.entries(data);
        for (let [key, value] of entries) {
            Object.defineProperty(newScope, key, {
                // ** Set the value
                value,
                // ** Can it be edited
                writable: true,
                // ** Will it be loopable e.g is shown in Object.entries
                enumerable: true,
                // ** Can it be deleted from this object
                configurable: true,
            });
        }
    }
    return newScope;
};

const generatemForBlueprint = (nodeToClone, scope, orderedProps, props, _children, parentBlueprint, data, index, _rootScope, isSVG = false) => {
    var _a, _b;
    if (data instanceof Blueprint)
        return data;
    let newScope;
    if (!!nodeToClone.scope) {
        newScope = new ((_a = nodeToClone.scope) !== null && _a !== void 0 ? _a : MintScope)();
        assignProps(newScope, orderedProps, props, scope);
    }
    else {
        newScope = scope || new MintScope();
    }
    applyScopeTransformers(newScope);
    const _scope = createForData(data, newScope, index);
    if (!!nodeToClone.scope) {
        assignProps(newScope, orderedProps, props, _scope);
    }
    const mintElementClone = nodeToClone.clone();
    if (!!mintElementClone.attributes) {
        delete mintElementClone.attributes.mFor;
        delete mintElementClone.attributes.mKey;
        delete mintElementClone.attributes.mForType;
    }
    const cloneMintNode = new CreateNode(mintElementClone, (_b = mintElementClone.attributes) !== null && _b !== void 0 ? _b : null, _children);
    cloneMintNode.props = Object.assign({}, props);
    delete cloneMintNode.props.mFor;
    delete cloneMintNode.props.mKey;
    delete cloneMintNode.props.mForType;
    const [blueprint] = generateBlueprints({
        nodes: [cloneMintNode],
        scope: _scope,
        parentBlueprint,
        _rootScope,
        isSVG,
        useGivenScope: true,
    });
    return blueprint;
};

class ForBlueprint extends Blueprint {
    constructor({ 
    // mintNode,
    render, refresh, nodeToClone, fragment, orderedProps, props, scope, parentBlueprint, forListBlueprints, 
    // collection,
    _rootScope, isSVG, }) {
        super({ render, refresh, scope, parentBlueprint, _rootScope });
        this.nodeToClone = nodeToClone;
        if (!!fragment)
            this.fragment = fragment;
        this.orderedProps = orderedProps;
        this.props = props;
        this.forListBlueprints = forListBlueprints;
        // this.collection = collection;
        if (!!isSVG)
            this.isSVG = isSVG;
        this._dev = "For";
    }
}

var FOR_Type;
(function (FOR_Type) {
    FOR_Type[FOR_Type["default"] = 0] = "default";
    FOR_Type[FOR_Type["match"] = 1] = "match";
})(FOR_Type || (FOR_Type = {}));

const recycleMForData = (currentScope, newData, newIndex) => {
    // ** Update the Object reference:
    // ** only if the Object has changed
    // ** AND only if _x is present already.
    if (currentScope.hasOwnProperty("_x") && currentScope._x !== newData) {
        currentScope._x = newData;
    }
    // ** Delete old values no longer on this new object;
    const currentScopeKeys = Object.keys(currentScope);
    for (let key of currentScopeKeys) {
        // ** Some properties are not changed once set.
        if (forScopePermantProperties.includes(key))
            continue;
        // ** We only want to try and delete properties that are on this object, not the prototype.
        if (!newData.hasOwnProperty(key)) {
            delete currentScope[key];
        }
    }
    if (typeof newData !== "string") {
        // ** Update or create values that weren't on Scope before.
        const newDataKeys = Object.keys(newData);
        for (let key of newDataKeys) {
            // ** This check is here not because we EXPECT these values to be on the new Object but because we DON'T EXPECT.
            // ** If they are here then they will break the Mint refresh causing untold misery to millions... and
            // ** as honest folk we can't possible allow that to happen!
            if (forScopePermantProperties.includes(key))
                continue;
            currentScope[key] = newData[key];
        }
    }
    if (currentScope._i !== newIndex) {
        currentScope._i = newIndex;
    }
};

const moveElement = (element, index) => {
    const parentElement = element.parentElement;
    const before = Array.from(parentElement.children)[index];
    if (before === undefined) {
        parentElement.append(element);
    }
    else {
        parentElement.insertBefore(element, before);
    }
};
const matchElements = (currentRenders, oldList, newList, forKey) => {
    let stopped = false;
    for (let [i, x] of currentRenders.entries()) {
        if (stopped)
            return;
        if (x.element === undefined)
            return;
        let index = -1;
        for (let [i, y] of newList.entries()) {
            if (x.scope[forKey] === y[forKey]) {
                index = i;
            }
        }
        if (index === undefined)
            return;
        if (i === index)
            return;
        if (index === -1) {
            console.warn(MINT_ERROR + "Unexpected mFor refresh error");
            return;
        }
        const [hold] = currentRenders.splice(i, 1);
        currentRenders.splice(index, 0, hold);
        stopped = true;
        const element = x.element;
        moveElement(element, index + 1);
        matchElements(currentRenders, oldList, newList, forKey);
    }
};

const handleErrorsAndWarnings = (blueprint, mFor) => {
    var _a, _b;
    const { nodeToClone, orderedProps, props, forListBlueprints, parentBlueprint, _rootScope, isSVG, } = blueprint;
    const { blueprintIndex } = getBlueprintIndex(blueprint);
    const childBlueprints = (_a = parentBlueprint === null || parentBlueprint === void 0 ? void 0 : parentBlueprint.childBlueprints) !== null && _a !== void 0 ? _a : _rootScope._rootChildBlueprints;
    const parentScope = (_b = parentBlueprint === null || parentBlueprint === void 0 ? void 0 : parentBlueprint.scope) !== null && _b !== void 0 ? _b : _rootScope;
    const { forKey } = mFor;
    /* Dev */
    // _DevLogger_("REFRESH", "mFor: ", mFor);
    const protoForData = resolvePropertyLookup(mFor.forValue, parentScope);
    // <@ REMOVE FOR PRODUCTION
    if (!(protoForData instanceof Array) && protoForData !== undefined) {
        throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${mFor.forValue}")`);
    }
    // @>
    // ** Here we run a check against the mKey to check there are no duplicates.
    // ** We only want to include one for each key match and ignore duplicates.
    const checkUnique = checkUniqueService(forKey);
    const cloneProtoForData = [...protoForData];
    const forData = [];
    for (let [i, x] of cloneProtoForData.entries()) {
        if (checkUnique(x, i, cloneProtoForData)) {
            forData.push(x);
        }
    }
    // ** Duplicates won't cause errors but we warn the user because its isn't expected.
    if (protoForData.length !== forData.length) {
        console.warn(`mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`);
    }
    const parentElement = getParentElement(blueprint);
    return {
        forKey,
        forData,
        blueprintIndex,
        parentElement,
        nodeToClone,
        orderedProps,
        props,
        parentScope,
        forListBlueprints,
        childBlueprints,
        parentBlueprint,
        _rootScope,
        isSVG,
    };
};
const changeElementPosition = (forRender, requiredIndex, forRenders, allElements, options) => {
    const element = forRender.element;
    if (element === undefined)
        return;
    const { parentElement } = element;
    if (requiredIndex >= forRenders.length - 1) {
        addElement(element, options.parentElement, options.childBlueprints, options.blueprintIndex);
    }
    else {
        const targetElement = allElements[requiredIndex];
        parentElement === null || parentElement === void 0 ? void 0 : parentElement.insertBefore(element, targetElement);
    }
};
const rearrangeElements = (forRenders, options) => {
    const allElements = [];
    for (let x of [...options.parentElement.children]) {
        for (let y of forRenders) {
            if (y.element === x) {
                allElements.push(x);
            }
        }
    }
    for (let [i, item] of forRenders.entries()) {
        const element = item.element;
        if (element === undefined) {
            continue;
        }
        const index = i;
        const locationIndex = allElements.indexOf(element);
        if (index !== locationIndex) {
            changeElementPosition(item, index, forRenders, allElements, options);
            rearrangeElements(forRenders, options);
            break;
        }
    }
};
const refreshMFor = (blueprint, { _mFor, newlyInserted }) => {
    var _a;
    const { forKey, forData, blueprintIndex, parentElement, nodeToClone, orderedProps, props, parentScope, parentBlueprint, forListBlueprints, childBlueprints, _rootScope, isSVG, } = handleErrorsAndWarnings(blueprint, _mFor);
    _mFor.forData = forData;
    const newList = forData;
    _mFor.oldForDataLength = newList.length;
    /* Dev */
    // _DevLogger_("REFRESH", "mFor: ", forData);
    // ** New list
    const newCurrentForRenders = [];
    // ** Find if each new item already exists on current list of childBlueprints.
    // ** If not then add the scope only. That way we can check which are already blueprinted
    // ** and blueprint the ones that aren't later.
    for (let [i, item] of newList.entries()) {
        let newCurrentRender = undefined;
        for (let x of forListBlueprints) {
            const { scope } = x;
            if (scope === undefined)
                continue;
            if (forKey === "_i") {
                if (i === scope["_i"]) {
                    newCurrentRender = x;
                    break;
                }
                continue;
            }
            if (forKey === "_x") {
                if (item === scope["_x"]) {
                    newCurrentRender = x;
                    break;
                }
                continue;
            }
            if (item[forKey] === scope[forKey]) {
                newCurrentRender = x;
            }
        }
        newCurrentForRenders.push(newCurrentRender || item);
        i++;
    }
    // ** Here we take the newly sorted renders and make sure they are all Blueprints
    // ** if not already.
    const forRenders = [];
    for (let [i, x] of newCurrentForRenders.entries()) {
        if (x instanceof Blueprint) {
            forRenders.push(x);
        }
        else {
            forRenders.push(generatemForBlueprint(nodeToClone, parentScope, orderedProps, props, nodeToClone.content, parentBlueprint, x, i, _rootScope, isSVG));
        }
    }
    _mFor.currentForRenders = forRenders;
    if (_mFor.mForType === FOR_Type.match) {
        const oldList = [..._mFor.currentForRenders];
        matchElements(_mFor.currentForRenders, oldList, newList, forKey);
        for (let [i, { scope }] of _mFor.currentForRenders.entries()) {
            recycleMForData(scope, newList[i], i);
        }
    }
    else if (_mFor.mForType === FOR_Type.default) {
        for (let [i, { scope }] of _mFor.currentForRenders.entries()) {
            recycleMForData(scope, newList[i], i);
        }
    }
    // ** Cycle through old list and if its not on the new list then remove this element.
    for (let currentRender of forListBlueprints) {
        if (!newCurrentForRenders.includes(currentRender) &&
            currentRender instanceof ElementBlueprint) {
            const element = currentRender.element;
            (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
        }
    }
    for (let targetRender of forRenders) {
        if (!forListBlueprints.includes(targetRender)) {
            const element = targetRender.element;
            if (element !== undefined) {
                addElement(element, parentElement, childBlueprints, blueprintIndex);
            }
        }
    }
    for (let targetRender of forRenders) {
        const { mintNode } = targetRender;
        if (mintNode === null)
            continue;
        if (!forListBlueprints.includes(targetRender)) {
            mintNode.render(targetRender, parentElement, childBlueprints, blueprintIndex);
        }
        else {
            const _refresh = mintNode.refresh;
            _refresh(targetRender, parentElement, {
                newlyInserted,
            });
        }
    }
    // ** We need to make sure that things are kept in sync.
    // ** Here we tell the forListBlueprints about the new list of Blueprints, either added or removed.
    {
        forListBlueprints.length = 0;
        for (let x of forRenders) {
            forListBlueprints.push(x);
        }
    }
    rearrangeElements(forRenders, {
        childBlueprints,
        parentElement,
        blueprintIndex,
    });
    return {
        condition: true,
        value: blueprint,
    };
};

const createmForObject = ({ forKey, forValue, mForType, nodeToClone, _children, parentScope, orderedProps, props, parentBlueprint, _rootScope, isSVG, }) => {
    const initialForData = resolvePropertyLookup(forValue, parentScope);
    if (!(initialForData instanceof Array) || initialForData === undefined) {
        throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${forValue}")`);
    }
    // ** Here we run a check against the mKey to check there are no duplicates.
    // ** We only want to include one for each key match and ignore duplicates.
    const checkUnique = checkUniqueService(forKey);
    const cloneForData = [...initialForData];
    const forData = [];
    for (let [i, x] of cloneForData.entries()) {
        if (checkUnique(x, i, cloneForData)) {
            forData.push(x);
        }
    }
    // ** Duplicates won't cause errors but we warn the user because its isn't expected.
    if (initialForData.length !== forData.length) {
        console.warn(`mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`);
    }
    const currentForRenders = [];
    for (let [i, x] of forData.entries()) {
        currentForRenders.push(generatemForBlueprint(nodeToClone, parentScope, orderedProps, props, _children, parentBlueprint, x, i, _rootScope, isSVG));
    }
    return {
        forKey,
        forValue,
        nodeToClone,
        scope: parentScope,
        forData,
        currentForRenders,
        oldForDataLength: forData.length,
        mForType,
    };
};
const generateMFor = ({ mForInstance, forValue, node, orderedProps, props, _children, parentScope, parentBlueprint, _rootScope, isSVG, }) => {
    var _a;
    const nodeToClone = node.mintNode;
    if (mForInstance.generated)
        return { condition: false };
    // <@ REMOVE FOR PRODUCTION
    {
        if (props.mKey === undefined) {
            console.error(nodeToClone);
            throw new Error(`${MINT_ERROR} mFor must have a mKey attribute`);
        }
    }
    // @>
    const forKey = props.mKey;
    // <@ REMOVE FOR PRODUCTION
    {
        if (forKey.includes(" ")) {
            console.warn(`${MINT_WARN} mKey value defined with a space, this may be a mistake. Value: "${forKey}".`);
        }
    }
    // @>
    // <@ REMOVE FOR PRODUCTION
    if (forValue.includes(" ")) {
        console.warn(`${MINT_WARN} mFor value defined with a space, this may be a mistake. Value: "${forValue}".`);
    }
    // @>
    mForInstance.generated = true;
    const mForType = (_a = props.mForType) !== null && _a !== void 0 ? _a : FOR_Type.default;
    // removeFromOrderedAttributes(orderedProps, props, [
    //   "mFor",
    //   "mKey",
    //   "mForType",
    // ]);
    mForInstance._mFor = createmForObject({
        forKey,
        forValue,
        mForType,
        nodeToClone: nodeToClone,
        _children,
        parentScope,
        orderedProps,
        props,
        parentBlueprint,
        _rootScope,
        isSVG,
    });
    const forListBlueprints = mForInstance._mFor.currentForRenders;
    const runRefresh = (blueprint, options) => {
        // refreshBlueprints(blueprint.forListBlueprints);
        refreshMFor(blueprint, Object.assign({ _mFor: mForInstance._mFor }, options));
    };
    mForInstance.blueprint = new ForBlueprint({
        render: mForInstance.onRender,
        // refresh: mForInstance.onRefresh,
        refresh: runRefresh,
        nodeToClone: nodeToClone,
        orderedProps,
        props,
        scope: parentScope,
        parentBlueprint,
        _rootScope,
        forListBlueprints,
        // collection: collection as Array<Blueprint>,
        isSVG: isSVG || undefined,
    });
    return {
        condition: true,
        value: mForInstance.blueprint,
    };
};

const renderFor = (blueprint, childBlueprints, parentElement, blueprintIndex) => {
    // <@ REMOVE FOR PRODUCTION
    if (blueprint === null ||
        blueprint.forListBlueprints === null ||
        blueprint.forListBlueprints === undefined) {
        throw new Error(`${MINT_ERROR} Render - For - Wrong Blueprint sent to mFor.`);
    }
    // @>
    const { forListBlueprints } = blueprint;
    for (let x of forListBlueprints) {
        renderBlueprints([x], parentElement, childBlueprints, [blueprintIndex]);
    }
    return {
        condition: true,
        value: blueprint,
    };
};

class MintFor extends MintAttribute {
    constructor(forValue) {
        super((oldInstance) => {
            const newInstance = new MintFor(forValue);
            newInstance._mFor = oldInstance._mFor;
            newInstance.generated = oldInstance.generated;
            newInstance.blueprint = oldInstance.blueprint;
            return newInstance;
        });
        this.generated = false;
        this.onGenerate = function (_a) {
            var args = __rest(_a, []);
            const that = this;
            return generateMFor(Object.assign({ mForInstance: that, forValue }, args));
        };
        this.onRender = function (blueprint, parentElement, parentChildBlueprints, blueprintIndex) {
            /* DEV */
            // _DevLogger_("RENDER", "FOR", blueprint, this);
            const that = this;
            if (that.blueprint !== blueprint) {
                throw new Error("This is an unexpected error");
            }
            return renderFor(that.blueprint, parentChildBlueprints, parentElement, blueprintIndex);
        };
        this.onRefresh = function (_, __, options) {
            const that = this;
            refreshMFor(that.blueprint, Object.assign({ _mFor: that._mFor }, options));
            return { condition: false };
        };
    }
}

const mFor = (forValue) => {
    return { mFor: new MintFor(forValue) };
};

class UpwardRef {
    constructor(ref = null) {
        this.ref = ref;
    }
}

const generateMRef = ({ refValue, htmlElement, parentScope, scope, isAttribute }) => {
    const value = resolvePropertyLookup(refValue, parentScope);
    // ** Here we check if the ref is UpwardRef.
    // ** This is a pattern where we don't manipulate the parentScope directly.
    // ** This means we can pass the property down to children.
    if (value instanceof UpwardRef) {
        value.ref = htmlElement;
    }
    else {
        const _scope = isAttribute ? scope : parentScope;
        _scope[refValue] = htmlElement;
        if (!!_scope._store) {
            if (_scope._store.hasOwnProperty(refValue)) {
                _scope._store[refValue] = htmlElement;
            }
            // <@ REMOVE FOR PRODUCTION
            else {
                console.warn(`${MINT_WARN} tried to add property "${refValue}" using mRef to store "${_scope._store.constructor.name}" which does not have this property.`);
            }
            // @>
        }
    }
    return {
        condition: false,
        value: undefined,
    };
};

class MintRef extends MintAttribute {
    constructor(refValue) {
        super(() => new MintRef(refValue));
        this.onGenerate = (_a) => {
            var args = __rest(_a, []);
            return generateMRef(Object.assign({ refValue }, args));
        };
    }
}

const mRef = (refValue) => {
    return { mRef: new MintRef(refValue) };
};

const _get = (target, value) => {
    let output = target;
    const trail = value.split(".");
    while (trail.length > 0) {
        const [property] = trail;
        output = output[property];
        trail.shift();
    }
    return output;
};
class Resolver extends ScopeTransformer {
    constructor(callback) {
        super((scope, key) => {
            Object.defineProperty(scope, key, {
                get: this.callback
            });
        });
        if (callback instanceof Function) {
            this.callback = callback;
        }
        else {
            this.callback = function () {
                return _get(this, callback);
            };
        }
    }
}

const getContexts = (blueprint, target) => {
    if (blueprint === undefined)
        return undefined;
    if (blueprint.contexts) {
        if (blueprint.contexts[target]) {
            return blueprint.contexts[target];
        }
    }
    if (blueprint.parentBlueprint === null)
        return undefined;
    return getContexts(blueprint.parentBlueprint, target);
};
class GetContext extends ScopeTransformer {
    constructor(target) {
        super((scope, key) => {
            Object.defineProperty(scope, key, {
                get: () => {
                    const value = getContexts(scope._mintBlueprint, target);
                    return value;
                }
            });
        });
        this.target = target;
    }
}

const quickElement = (name, attributesOrInitialContent, initialContent) => {
    let attributes = null;
    let content;
    // ** If initialContent is defined then we used all arguments.
    if (initialContent !== undefined) {
        attributes = attributesOrInitialContent;
        content = initialContent;
    }
    // ** If the attributesOrInitialContent is not an Object (not an Array) then this must be attributes only.
    else if (typeof attributesOrInitialContent !== "string" &&
        !(attributesOrInitialContent instanceof Array) &&
        !(attributesOrInitialContent instanceof CreateNode)) {
        attributes = attributesOrInitialContent;
    }
    // ** Otherwise we know that the second argument is the content and that
    // ** attributes should be null.
    else {
        attributes = null;
        content = attributesOrInitialContent;
    }
    return node(name, attributes, content);
};

const span = (attributesOrContent, _content) => {
    return quickElement("span", attributesOrContent, _content);
};

const div = (attributesOrContent, _content) => {
    return quickElement("div", attributesOrContent, _content);
};

exports.GetContext = GetContext;
exports.MintComponent = MintComponent;
exports.MintElement = MintElement;
exports.MintScope = MintScope;
exports.Resolver = Resolver;
exports.Store = Store;
exports.UpwardRef = UpwardRef;
exports.app = app;
exports.component = component;
exports.context = context;
exports.deleteApp = deleteApp;
exports.div = div;
exports.mExtend = mExtend;
exports.mFor = mFor;
exports.mIf = mIf;
exports.mRef = mRef;
exports.node = node;
exports.refresh = externalRefresh;
exports.resolvePropTypes = resolvePropTypes;
exports.span = span;
exports.template = template;
