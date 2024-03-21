class Resolver {
    constructor(callback) {
        this.callback = callback;
    }
}
class Store {
    constructor(initialData) {
        if (!(initialData instanceof Object)) {
            throw "You must provide an Object to create a new Store.";
        }
        Object.entries(initialData).forEach(([key, value]) => {
            if (value instanceof Resolver) {
                Object.defineProperty(this, key, {
                    get: value.callback,
                });
            }
            else {
                this[key] = value;
            }
        });
        this._component = null;
        this._keys = Object.keys(initialData);
        this._data = initialData;
        Object.seal(this);
    }
    connect(scope) {
        this._component = scope;
        scope._store = this;
        {
            let i = 0;
            while (i < this._keys.length) {
                const key = this._keys[i];
                const value = this._data[key];
                if (value instanceof Resolver) {
                    Object.defineProperty(scope, key, {
                        get: value.callback,
                    });
                }
                else {
                    Object.defineProperty(scope, key, {
                        get: () => this[key],
                        set: (_value) => (this[key] = _value),
                    });
                }
                i++;
            }
        }
    }
}

const MINT_ERROR = "MINT ERROR --";

const deBracer = (text, scope, errorMessage) => {
    if (typeof text !== "string" && !(text instanceof Resolver)) {
        console.error(errorMessage, " -- deBracer ERROR. Text sent: ", text, "Scope: ", scope);
        throw new Error(`${MINT_ERROR} Text sent to resolve, not text: ${text}`);
    }
    const textValue = text instanceof Resolver ? text.callback() : text;
    return textValue.replace(/\\*\{[a-zA-Z0-9_$]+\}/g, (x) => {
        if (x.charAt(0) === "\\")
            return x.substring(1);
        const subStr = x.substring(1, x.length - 1);
        const _value = scope[subStr];
        const value = _value instanceof Function ? _value.apply(scope) : _value;
        const resolvedValue = (() => {
            if (value === undefined || value === null)
                return "";
            if (typeof value === "number")
                return value.toString();
            return value;
        })();
        return deBracer(resolvedValue, scope, errorMessage);
    });
};

const renderTextTemplate = (template, rootElement) => {
    const _template = template;
    rootElement.appendChild(_template.textNode);
    _template.textNode.nodeValue = deBracer(_template.textValue, _template.scope, "Render - textNode");
};

class MintComponent {
    constructor(mintElement, scope) {
        this.mintElement = mintElement;
        this.scope = scope;
        if (scope === null || scope === void 0 ? void 0 : scope.propTypes) {
            this.propTypes = scope.propTypes;
        }
    }
}

class Template {
    constructor({ element, textValue, attributes, component, content, props, templates = [], scope, parentTemplate, mIf, mFor, mRef, mTemplate, componentElement, mintElement, context, }) {
        if (element instanceof Text) {
            this.textNode = element;
            this.textValue = textValue;
            this.isComponent = false;
        }
        else if (element instanceof HTMLElement ||
            element instanceof SVGElement) {
            this.element = element;
            this.attributes = attributes;
            this.isComponent = false;
            this.mIf = mIf;
            this.mFor = mFor;
            this.mRef = mRef;
            this.mTemplate = mTemplate;
            this.context = context;
        }
        else if (component instanceof MintComponent) {
            this.component = component;
            this.content = content;
            this.props = props;
            this.isComponent = true;
            this.mIf = mIf;
            this.mFor = mFor;
            this.mRef = mRef;
            this.mTemplate = mTemplate;
            this.componentElement = componentElement;
            this.attributes = attributes;
            this.context = context;
        }
        this.templates = templates;
        this.scope = scope;
        this.parentTemplate = parentTemplate;
        this.mintElement = mintElement;
    }
}

class IF_Template {
    constructor({ mintElement, parentTemplate, scope, isSVG, mIf, isComponent, }) {
        this.mintElement = mintElement;
        this.parentTemplate = parentTemplate;
        this.scope = scope;
        this.isSVG = isSVG;
        this.mIf = mIf;
        this.isComponent = isComponent;
    }
}

const getWhereToInsert = (templates, rootElement, templateIndex) => {
    let i = templateIndex + 1;
    while (i < templates.length) {
        const template = templates[i++];
        if (template instanceof IF_Template)
            continue;
        const { mFor } = template;
        if (mFor !== undefined) {
            let j = 0;
            while (j < mFor.currentForRenders.length) {
                const forTemplate = mFor.currentForRenders[j++];
                const element = forTemplate.componentElement || forTemplate.element;
                if (element !== undefined && rootElement.contains(element)) {
                    return element;
                }
            }
            continue;
        }
        if (template instanceof Template) {
            const element = template.componentElement || template.element;
            if (element !== undefined && rootElement.contains(element)) {
                return element;
            }
        }
    }
};

const addElement = (element, templates, rootElement, templateIndex) => {
    const elementToInsertBefore = getWhereToInsert(templates, rootElement, templateIndex);
    if (element === undefined)
        return;
    if (elementToInsertBefore !== undefined) {
        rootElement.insertBefore(element, elementToInsertBefore);
    }
    else {
        rootElement.appendChild(element);
    }
};

const renderEventAttributes = (element, key, value, attributes, scope) => {
    const target = key.substring(1, key.length - 1);
    const eventValue = scope[value];
    const options = eventValue === null || eventValue === void 0 ? void 0 : eventValue.mintEventOptions;
    element.addEventListener(target, (event) => {
        if (eventValue === undefined) {
            console.error(element);
            throw new Error(`${MINT_ERROR} Event provided is undefined, use instead null to skip, for event '${target}' - '${value}'.`);
        }
        if (eventValue === null)
            return;
        eventValue.apply(scope, [event, element, scope]);
    }, options);
    delete attributes[key];
};

const isWritable = (value, parentScope) => {
    let properties = Object.getOwnPropertyDescriptor(parentScope, value);
    if (properties === undefined &&
        parentScope._parent !== undefined) {
        properties = Object.getOwnPropertyDescriptor(parentScope._parent, value);
    }
    return properties !== undefined && properties.writable === undefined
        ? properties.get
        : undefined;
};

const attributesThatAreProperties = ["checked", "value"];

const getValue$1 = (value, scope) => {
    const writable = isWritable(value, scope);
    const _value = writable instanceof Function
        ? writable.apply(scope)
        : scope[value];
    return _value;
};
const renderBindingAttributes = (element, key, value, scope) => {
    const target = key.substring(1, key.length - 1);
    const _value = getValue$1(value, scope);
    const newAttributeValue = _value instanceof Function ? _value.apply(scope) : _value;
    if (typeof newAttributeValue === "boolean") {
        element[target] = newAttributeValue;
    }
    else if (attributesThatAreProperties.includes(target)) {
        const value = typeof newAttributeValue === "string"
            ? deBracer(newAttributeValue, scope, "Render - binding property")
            : newAttributeValue;
        if (target === "value" && element instanceof HTMLSelectElement) {
            setTimeout(() => {
                element[target] = value;
            }, 0);
        }
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

const setAttribute$1 = (element, key, value, attributes, scope) => {
    if (key.charAt(0) === "(" && key.slice(-1) === ")") {
        renderEventAttributes(element, key, value, attributes, scope);
    }
    else if (key.charAt(0) === "[" && key.slice(-1) === "]") {
        renderBindingAttributes(element, key, value, scope);
    }
    else {
        renderStringAttribute(element, key, value, scope);
    }
};
const renderAttributes = (element, attributes, scope) => {
    if (attributes["m-extend"] instanceof Object) {
        Object.entries(attributes["m-extend"]).forEach(([key, value]) => {
            attributes[key] = value;
        });
        delete attributes["m-extend"];
    }
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === "mintElement_index")
            return;
        setAttribute$1(element, key, value, attributes, scope);
    });
};

const renderElementTemplate = (template, rootElement, templates, templateIndex) => {
    const _template = template;
    if (_template.mIf !== undefined && _template.mIf.state === false)
        return;
    renderAttributes(_template.element, _template.attributes, _template.scope);
    addElement(_template.element, templates, rootElement, templateIndex);
    _template.templates.forEach((x, i) => renderTemplate(_template.element, x, _template.templates, i));
};

const renderComponentTemplate = (template, rootElement, templates, templateIndex) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const _template = template;
    if (_template.mIf !== undefined && _template.mIf.state === false)
        return;
    (_b = (_a = _template.scope).oninit) === null || _b === void 0 ? void 0 : _b.call(_a);
    (_d = (_c = _template.scope).oninsert) === null || _d === void 0 ? void 0 : _d.call(_c);
    (_f = (_e = _template.scope).oneach) === null || _f === void 0 ? void 0 : _f.call(_e);
    renderAttributes(_template.componentElement, _template.attributes, _template.scope);
    addElement(_template.componentElement, templates, rootElement, templateIndex);
    (_g = _template.templates) === null || _g === void 0 ? void 0 : _g.forEach((x, i) => renderTemplate(_template.componentElement, x, _template.templates, i));
    (_j = (_h = _template.scope).onafterinsert) === null || _j === void 0 ? void 0 : _j.call(_h, { props: _template.props });
    return;
};

const addList = (list, templates, rootElement, templateIndex) => {
    list.forEach((x) => {
        renderTemplate(rootElement, x, templates, templateIndex);
    });
};

class FOR_Template {
    constructor({ mintElement, parentTemplate, scope, isSVG, mFor, isComponent, }) {
        this.mintElement = mintElement;
        this.parentTemplate = parentTemplate;
        this.scope = scope;
        this.isSVG = isSVG;
        this.mFor = mFor;
        this.isComponent = isComponent;
    }
}

const renderTemplate = (rootElement, template, templates, templateIndex) => {
    if (template.textNode !== undefined) {
        return renderTextTemplate(template, rootElement);
    }
    if (template.element !== undefined) {
        return renderElementTemplate(template, rootElement, templates, templateIndex);
    }
    if (template.component !== undefined) {
        return renderComponentTemplate(template, rootElement, templates, templateIndex);
    }
    if (template instanceof FOR_Template) {
        addList(template.mFor.currentForRenders, templates, rootElement, templateIndex);
    }
};

let mintElement_index = 0;
const cloneAttributes = (mintElement) => {
    return Object.assign({
        mintElement_index: ++mintElement_index,
    }, mintElement.attributes || mintElement.props);
};

const cloneContent = (content) => {
    if (typeof content === "string")
        return content;
    if (content instanceof Function) {
        return content;
    }
    return content.clone();
};

class MintElement {
    constructor(element, attributesOrProps = {}, content) {
        if (element instanceof MintComponent) {
            this.component = element;
            this.props = attributesOrProps !== null && attributesOrProps !== void 0 ? attributesOrProps : {};
        }
        else {
            this.element = element;
            this.attributes = attributesOrProps !== null && attributesOrProps !== void 0 ? attributesOrProps : {};
        }
        this.content =
            content instanceof Array ? content : content === null ? [] : [content];
    }
    clone() {
        const element = this.element || this.component;
        if (element instanceof MintComponent) {
            element.mintElement = element.mintElement.clone();
        }
        return new MintElement(element, cloneAttributes(this), this.content instanceof Array
            ? this.content.map((x) => cloneContent(x))
            : cloneContent(this.content));
    }
}

const element = (element, attributesOrProps, content = []) => {
    return new MintElement(element, attributesOrProps, content);
};

const getContent = (template) => {
    const { content } = template;
    if (content !== undefined && content !== null)
        return content;
    if (template.parentTemplate === null)
        return;
    return getContent(template.parentTemplate);
};
const resolveChildren = (template, templates) => {
    const content = getContent(template);
    if (content === undefined)
        return templates.filter((x) => x !== "_children");
    const output = [];
    templates.forEach((x) => {
        if (x === "_children") {
            output.push(...content);
        }
        else
            output.push(x);
    });
    return output;
};

const handleResolverProperties = (scope, key, value, parentScope) => {
    const writable = isWritable(value, parentScope);
    if (writable instanceof Function) {
        Object.defineProperty(scope, key, {
            get: writable,
            configurable: true,
        });
    }
    else {
        scope[key] = parentScope[value];
    }
};
const bindingTemplateProp = (scope, key, value, parentScope, type) => {
    if (key !== "scope") {
        handleResolverProperties(scope, key, value, parentScope);
        return;
    }
    if (type === "template") {
        if (value === "_store") {
            scope[key] = parentScope._store;
        }
        else if (value === "_scope") {
            const _parentScope = parentScope;
            if (_parentScope.__name === "_ForData") {
                scope[key] = _parentScope._parent;
            }
            else {
                scope[key] = parentScope;
            }
        }
    }
};
const assignProps = (scope, props, parentScope, type) => {
    Object.entries(props).forEach(([key, value]) => {
        if (key.charAt(0) === "[" && key.charAt(key.length - 1) === "]") {
            const _key = key.substring(1, key.length - 1);
            bindingTemplateProp(scope, _key, value, parentScope, type);
        }
        else {
            scope[key] =
                typeof value === "string"
                    ? deBracer(value, parentScope, "Template -- props")
                    : value;
        }
    });
};

const generateTemplates = (elements, parentTemplate, scope, { isSVG = false, resolvedContext, } = {}) => {
    return elements
        .map((x) => generateTemplate(x, parentTemplate, scope, { isSVG, resolvedContext }))
        .filter((x) => !!x);
};

class Base {
    constructor() { }
}

const generateComponentTemplate = (mintElement, parentTemplate, rootScope, { isSVG, isMFor }, { mIf, mFor, mRef, mTemplate, resolvedContext, }) => {
    var _a, _b;
    const _mintElement = mintElement;
    const { attributes } = _mintElement.component.mintElement;
    if (!(_mintElement.component.scope instanceof Function) &&
        _mintElement.component.scope !== null) {
        throw new Error(`${MINT_ERROR} Mint Component -- scope -- must pass a constructor function for Component scope argument (second argument) i.e component("div", function(){}`);
    }
    const componentElement = _mintElement.component.mintElement.element === "svg" || isSVG
        ? document.createElementNS("http://www.w3.org/2000/svg", _mintElement.component.mintElement.element)
        : document.createElement(_mintElement.component.mintElement.element);
    _mintElement.component.mintElement.element === "svg" && (isSVG = true);
    const scope = isMFor
        ? rootScope
        : new ((_a = _mintElement.component.scope) !== null && _a !== void 0 ? _a : Base)();
    if (mRef) {
        scope[mRef.refValue] = componentElement;
    }
    else if (!!attributes.mRef) {
        const refValue = attributes.mRef;
        delete attributes.mRef;
        mRef = { refValue, scope };
        scope[refValue] = componentElement;
    }
    !mFor &&
        assignProps(scope, _mintElement.props, (parentTemplate === null || parentTemplate === void 0 ? void 0 : parentTemplate.scope) || rootScope || {}, "template");
    Object.assign(scope, resolvedContext);
    (_b = scope.onpretemplate) === null || _b === void 0 ? void 0 : _b.call(scope);
    const mintElementContent = _mintElement.content;
    const template = new Template({
        component: _mintElement.component,
        content: generateTemplates(mintElementContent.map(cloneContent), parentTemplate, scope, { isSVG, resolvedContext }),
        props: _mintElement.props,
        scope,
        parentTemplate,
        mIf,
        mFor,
        mRef,
        mTemplate,
        componentElement,
        attributes: cloneAttributes(_mintElement.component.mintElement),
        mintElement,
    });
    const componentContent = _mintElement.component.mintElement.content;
    const content = componentContent.map(cloneContent);
    const templates = generateTemplates(content, template, scope, {
        isSVG,
        resolvedContext,
    });
    template.templates = templates;
    template.templates = resolveChildren(template, templates);
    scope._mintTemplate = template;
    return template;
};

const generateTextTemplate = (mintElement, parentTemplate, rootScope) => {
    const textNode = document.createTextNode("");
    return new Template({
        element: textNode,
        textValue: mintElement,
        scope: rootScope,
        parentTemplate,
        mintElement,
    });
};

class UpwardRef {
    constructor(ref = null) {
        this.ref = ref;
    }
}

const generateElementTemplate = (mintElement, parentTemplate, rootScope, { isSVG }, { mIf, mFor, mRef, mTemplate, resolvedContext, context, } = {}) => {
    const _mintElement = mintElement;
    let content = _mintElement.content;
    _mintElement.element === "svg" && (isSVG = true);
    const element = isSVG
        ? document.createElementNS("http://www.w3.org/2000/svg", _mintElement.element)
        : document.createElement(_mintElement.element);
    if (mRef) {
        const value = rootScope[mRef.refValue];
        if (value instanceof UpwardRef) {
            value.ref = element;
        }
        else {
            rootScope[mRef.refValue] = element;
        }
    }
    const template = new Template({
        element,
        attributes: _mintElement.attributes,
        scope: rootScope,
        parentTemplate,
        mIf,
        mFor,
        mRef,
        mTemplate,
        mintElement,
        context,
    });
    const templates = !!content
        ? generateTemplates(content, template, rootScope, {
            isSVG,
            resolvedContext,
        })
        : [];
    template.templates = templates;
    template.templates = resolveChildren(template, templates);
    return template;
};

const generateMIf = (mintElement, _ifValue, scope) => {
    const inverse = _ifValue.charAt(0) === "!";
    const ifValue = inverse ? _ifValue.substring(1) : _ifValue;
    const _state = scope[ifValue];
    const result = _state instanceof Resolver ? _state.callback() : _state;
    const state = inverse ? !result : !!result;
    return {
        inverse,
        ifValue,
        state,
        scope,
        templated: state,
        mintElement,
    };
};

const checkUnique = (key) => (x, i, arr) => {
    if (key === "_i")
        return true;
    const outerKey = x[key];
    const innerIndex = arr.findIndex((y, j) => {
        const innerKey = y[key];
        return innerKey === outerKey;
    });
    return innerIndex === i;
};

const createForData = (data, scope, index) => {
    const Data = function _ForData() {
        this._parent = scope;
        this._x = data;
        this._i = index;
        this.__name = "_ForData";
    };
    Data.prototype = scope;
    const newScope = new Data();
    if (data instanceof Object) {
        Object.entries(data).forEach(([key, value]) => {
            Object.defineProperty(newScope, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        });
    }
    return newScope;
};

const generateForTemplates = (mintElement, parentTemplate, parentScope, forData, { isComponent = false, isSVG = false, }) => {
    const component = mintElement.component instanceof Function
        ? mintElement.component()
        : mintElement.component;
    const list = forData.map((x, index) => {
        var _a;
        if (x instanceof Template)
            return x;
        const newScope = !isComponent
            ? parentScope || new Base()
            : new ((_a = component.scope) !== null && _a !== void 0 ? _a : Base)();
        const scope = createForData(x, newScope, index);
        const mintElementClone = mintElement.clone();
        const template = generateTemplate(mintElementClone, parentTemplate, scope, {
            isSVG,
            isMFor: true,
        });
        return template;
    });
    return list;
};

const generateMFor = (forKey, forValue, mintElement, scope, parentTemplate, { isComponent, mForType, isSVG, } = { isComponent: false, isSVG: false }) => {
    const _forData = scope[forValue];
    if (!(_forData instanceof Array) || _forData === undefined) {
        throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor`);
    }
    const forData = [..._forData].filter(checkUnique(forKey));
    const currentForRenders = generateForTemplates(mintElement, parentTemplate, scope, forData, { isComponent, isSVG });
    if (_forData.length !== forData.length) {
        console.warn(`mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`);
    }
    return {
        forKey,
        forValue,
        mintElement,
        scope,
        forData,
        currentForRenders,
        oldForDataLength: forData.length,
        mForType,
    };
};

class MintTemplate {
    constructor(target, { refreshOnEach, replaceCondition }) {
        this.target = target;
        this.refreshOnEach = refreshOnEach !== null && refreshOnEach !== void 0 ? refreshOnEach : true;
        this.replaceCondition = replaceCondition;
    }
    clone() {
        const { refreshOnEach, replaceCondition } = this;
        return new MintTemplate(this.target, { refreshOnEach, replaceCondition });
    }
}

class Template_Template {
    constructor({ mintTemplate, parentTemplate, scope, isSVG }) {
        this.mintTemplate = mintTemplate;
        this.parentTemplate = parentTemplate;
        this.scope = scope;
        this.isSVG = isSVG;
    }
}

class Context {
    constructor(element, context, content) {
        this.element = element;
        this.context = context;
        this.content = content;
    }
    clone() {
        return new Context(this.element, this.context, this.content instanceof Array
            ? this.content.map(cloneContent)
            : cloneContent(this.content));
    }
}

const generateTemplate = (mintElement, parentTemplate, rootScope, { isSVG = false, isMFor = false, mTemplate = undefined, resolvedContext = undefined, } = {
    isSVG: false,
    isMFor: false,
    mTemplate: undefined,
    resolvedContext: undefined,
}) => {
    if (mintElement instanceof Context) {
        const _resolvedContext = {};
        Object.assign(_resolvedContext, resolvedContext || {});
        assignProps(_resolvedContext, mintElement.context, rootScope, "template");
        const newElement = element(mintElement.element, null, mintElement.content);
        return generateElementTemplate(newElement, parentTemplate, rootScope, {
            isSVG,
        }, {
            resolvedContext: _resolvedContext,
            context: mintElement,
        });
    }
    if (mintElement instanceof MintTemplate) {
        const mintTemplate = mintElement;
        const content = rootScope[mintTemplate.target];
        if (content instanceof Array) {
            throw new Error(`${MINT_ERROR} Template output was Array. Template output from template(target) can be MintElement only.`);
        }
        if (content !== undefined &&
            !(content instanceof MintElement) &&
            typeof content !== "string") {
            throw new Error(`${MINT_ERROR} Template output not one of the following: undefined, MintElement, string`);
        }
        if (content === undefined) {
            return new Template_Template({
                mintTemplate,
                parentTemplate,
                scope: rootScope,
                isSVG,
            });
        }
        const { target, refreshOnEach, replaceCondition } = mintTemplate;
        const options = {
            isSVG,
            isMFor,
            mTemplate: { target, refreshOnEach, replaceCondition },
        };
        const template = generateTemplate(content, parentTemplate, rootScope, options);
        return template;
    }
    if (mintElement === "_children") {
        return mintElement;
    }
    if (typeof mintElement === "string") {
        return generateTextTemplate(mintElement, parentTemplate, rootScope);
    }
    let mIf;
    let mFor;
    let mRef;
    let template;
    const { attributes, props } = mintElement;
    const properties = attributes || props;
    if (!!properties.mIf) {
        const ifValue = properties.mIf;
        delete (attributes || props).mIf;
        mIf = generateMIf(mintElement, ifValue, rootScope);
        if (mIf.state === false)
            return new IF_Template({
                mintElement,
                parentTemplate,
                scope: rootScope,
                isSVG,
                mIf,
                isComponent: !!mintElement.component,
            });
    }
    if (!!properties.mFor) {
        const forKey = properties.mKey;
        if (forKey === undefined || forKey === "") {
            console.error(mintElement);
            throw new Error(`${MINT_ERROR} mFor must have a mKey attribute`);
        }
        const forValue = properties.mFor;
        const mForType = properties.mForType;
        delete (attributes || props).mFor;
        delete (attributes || props).mKey;
        delete (attributes || props).mForType;
        const isComponent = !!mintElement.component;
        mFor = generateMFor(forKey, forValue, mintElement, rootScope, parentTemplate, { isComponent, mForType, isSVG });
        return new FOR_Template({
            mintElement,
            parentTemplate,
            scope: rootScope,
            isSVG,
            mFor,
            isComponent,
        });
    }
    if (!!properties.mRef) {
        const refValue = properties.mRef;
        delete (attributes || props).mRef;
        mRef = {
            refValue,
            scope: rootScope || (parentTemplate === null || parentTemplate === void 0 ? void 0 : parentTemplate.scope),
        };
    }
    if (mintElement.component instanceof MintComponent) {
        template = generateComponentTemplate(mintElement, parentTemplate, rootScope, { isSVG, isMFor }, {
            mIf,
            mFor,
            mRef,
            mTemplate,
            resolvedContext,
        });
    }
    else {
        template = generateElementTemplate(mintElement, parentTemplate, rootScope, { isSVG }, { mIf, mFor, mRef, mTemplate, resolvedContext });
    }
    return template;
};

const refreshTextNode = (template) => {
    const _template = template;
    _template.textNode.nodeValue = deBracer(_template.textValue, _template.scope, "Refresh - textNode");
};

const attributesThatAreBoolean = ["checked"];

const getValue = (value, scope) => {
    const writable = isWritable(value, scope);
    const _value = writable instanceof Function
        ? writable.apply(scope)
        : scope[value];
    return _value;
};
const refreshBindingAttributes = (element, key, value, scope) => {
    const target = key.substring(1, key.length - 1);
    const oldAttributeValue = element.getAttribute(target);
    const _value = getValue(value, scope);
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
        if (target === "value" && element instanceof HTMLSelectElement) {
            setTimeout(() => {
                element[target] = value;
            }, 0);
        }
        else if (attributesThatAreBoolean.includes(target)) {
            element[target] = !!value;
        }
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
    if (key.charAt(0) === "(" && key.slice(-1) === ")") {
        console.error("Event handler attribute was present in refresh");
        console.trace();
    }
    if (key.charAt(0) === "[" && key.slice(-1) === "]") {
        refreshBindingAttributes(element, key, value, scope);
    }
    else {
        refreshStringAttribute(element, key, value, scope);
    }
};
const refreshAttributes = (element, attributes, scope) => {
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === "mintElement_index")
            return;
        setAttribute(element, key, value, scope);
    });
};

const refreshElementTemplate = (template, { inserted }) => {
    const _template = template;
    refreshAttributes(_template.element, _template.attributes, _template.scope);
};

const refreshComponentTemplate = (template, { inserted }) => {
    var _a, _b, _c, _d;
    const _template = template;
    _template.parentTemplate &&
        assignProps(_template.scope, _template.props, _template.parentTemplate.scope, "refresh");
    (_b = (_a = template.scope).oneach) === null || _b === void 0 ? void 0 : _b.call(_a);
    inserted && ((_d = (_c = template.scope).oninsert) === null || _d === void 0 ? void 0 : _d.call(_c));
    refreshAttributes(_template.componentElement, _template.attributes, _template.scope);
};

const refreshMIf = (rootElement, template, templateIndex) => {
    var _a;
    const { mIf, parentTemplate, scope, isComponent } = template;
    if (mIf === undefined || parentTemplate === null)
        return { newState: undefined };
    const oldState = mIf.state;
    const { ifValue, inverse } = mIf;
    const checkScope = isComponent ? parentTemplate.scope : scope;
    const state = checkScope[ifValue];
    const result = state instanceof Resolver ? state.callback() : state;
    mIf.state = inverse ? !result : !!result;
    const newState = mIf.state;
    if (oldState !== newState) {
        if (oldState === false) {
            let newTemplate = template;
            if (mIf.templated === false) {
                const _template = template;
                newTemplate = generateTemplate(_template.mintElement, _template.parentTemplate, _template.scope, { isSVG: _template.isSVG });
                newTemplate.mIf = template.mIf;
                parentTemplate.templates.splice(templateIndex, 1, newTemplate);
                mIf.templated = true;
                rootElement !== undefined &&
                    renderTemplate(rootElement, newTemplate, parentTemplate.templates, templateIndex);
                return { newState: false };
            }
            else {
                const _template = template;
                const element = _template.componentElement || _template.element;
                element !== undefined &&
                    _template.parentTemplate !== null &&
                    addElement(element, _template.parentTemplate.templates, rootElement, templateIndex);
            }
        }
        else if (template instanceof Template) {
            const element = template.element || template.componentElement;
            (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
        }
    }
    return { oldState, newState };
};

const recycleMForData = (currentScope, newData, newIndex) => {
    if (Object.prototype.hasOwnProperty.apply(currentScope, ["_x"]) &&
        currentScope._x !== newData) {
        currentScope._x = newData;
    }
    Object.keys(currentScope).forEach((key) => {
        if (key === "_parent" || key === "_i" || key === "_x")
            return;
        if (!Object.prototype.hasOwnProperty.apply(newData, [key])) {
            if (key !== "__name") {
                delete currentScope[key];
            }
        }
    });
    Object.keys(newData).forEach((key) => {
        if (key === "_i" || key === "_x")
            return;
        currentScope[key] = newData[key];
    });
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
    currentRenders.forEach((x, i) => {
        if (stopped)
            return;
        const index = newList.findIndex((y) => x.scope[forKey] === y[forKey]);
        if (i === index)
            return;
        if (index === -1) {
            console.warn(MINT_ERROR + "Unexpected mFor refresh error");
            return;
        }
        const [hold] = currentRenders.splice(i, 1);
        currentRenders.splice(index, 0, hold);
        stopped = true;
        moveElement(x.element, index + 1);
        matchElements(currentRenders, oldList, newList, forKey);
    });
};

const refreshMFor = (template, templates, templateIndex, { inserted }) => {
    const { mFor, parentTemplate, scope, isComponent, isSVG } = template;
    if (mFor === undefined || parentTemplate === null)
        return;
    const { forKey, currentForRenders } = mFor;
    const { oldForDataLength } = mFor;
    const checkScope = isComponent ? parentTemplate.scope : scope;
    const _forData = checkScope[mFor.forValue];
    if (!(_forData instanceof Array) && _forData !== undefined) {
        throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor`);
    }
    const forData = [..._forData].filter(checkUnique(forKey));
    if (_forData.length !== forData.length) {
        console.warn(`mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`);
    }
    mFor.forData = forData;
    const newList = forData;
    mFor.oldForDataLength = newList.length;
    if (newList === undefined)
        return;
    if (oldForDataLength !== newList.length) {
        const newCurrentForRenders = [];
        {
            let i = 0;
            while (i < newList.length) {
                const item = newList[i];
                const newCurrentRender = currentForRenders.find(({ scope }) => {
                    const value = scope[forKey];
                    return forKey === "_x"
                        ? value === item
                        : value === item[forKey];
                });
                newCurrentForRenders.push(newCurrentRender || item);
                i++;
            }
        }
        currentForRenders.forEach((currentRender) => {
            var _a;
            if (!newCurrentForRenders.includes(currentRender)) {
                const element = currentRender.isComponent
                    ? currentRender.componentElement
                    : currentRender.element;
                (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
            }
        });
        const rendersList = newCurrentForRenders.map((x, i) => {
            if (x instanceof Template) {
                return x;
            }
            return generateForTemplates(template.mintElement, parentTemplate, checkScope, [x], { isComponent, isSVG })[0];
        });
        mFor.currentForRenders = rendersList;
        addList(rendersList, templates, (parentTemplate.componentElement || parentTemplate.element), templateIndex);
    }
    if (mFor.mForType === "match") {
        const oldList = [...mFor.currentForRenders];
        matchElements(mFor.currentForRenders, oldList, newList, forKey);
        mFor.currentForRenders.forEach(({ scope }, i) => recycleMForData(scope, newList[i], i));
    }
    else {
        mFor.currentForRenders.forEach(({ scope }, i) => recycleMForData(scope, newList[i], i));
    }
    mFor.currentForRenders.forEach((x) => {
        const { isComponent, templates } = x;
        const _i = { inserted };
        isComponent
            ? refreshComponentTemplate(x, _i)
            : refreshElementTemplate(x, _i);
        templates.forEach((y, i) => {
            const pt = y.parentTemplate;
            const type = (pt === null || pt === void 0 ? void 0 : pt.componentElement) || (pt === null || pt === void 0 ? void 0 : pt.element);
            refreshTemplate(type, y, templates, i, _i);
        });
    });
};

const refreshTemplate = (rootElement, _template, templates, templateIndex, { inserted }) => {
    var _a, _b, _c, _d, _e, _f;
    let template;
    if (_template instanceof Template_Template) {
        template = generateTemplate(_template.mintTemplate, _template.parentTemplate, _template.scope, { isSVG: _template.isSVG });
        if (template instanceof Template_Template)
            return;
    }
    else {
        template = _template;
    }
    if (template instanceof Template && template.mTemplate !== undefined) {
        const replace = (_b = (_a = template.mTemplate.replaceCondition) === null || _a === void 0 ? void 0 : _a.apply(template.scope)) !== null && _b !== void 0 ? _b : template.mTemplate.refreshOnEach;
        if (!replace)
            return;
        if (template.parentTemplate === null)
            return;
        const { mTemplate } = template;
        const content = template.scope[template.mTemplate.target] ||
            template.parentTemplate.scope[template.mTemplate.target];
        const isComponent = !!template.componentElement;
        if (isComponent) {
            (_d = (_c = template.componentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(template.componentElement);
        }
        else {
            (_f = (_e = template.element) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.removeChild(template.element);
        }
        if (content === undefined)
            return;
        const newTemplate = generateTemplate(content, template.parentTemplate, template.scope, { mTemplate });
        templates.splice(templateIndex, 1, newTemplate);
        renderTemplate(rootElement, newTemplate, templates, templateIndex);
        return;
    }
    if (template instanceof Template && template.textNode !== undefined) {
        return refreshTextNode(template);
    }
    if (template instanceof IF_Template ||
        (template instanceof Template && template.mIf !== undefined)) {
        const { oldState, newState } = refreshMIf(rootElement, template, templateIndex);
        if (newState === false)
            return;
        if (template.isComponent && oldState === false && newState === true) {
            inserted = true;
        }
    }
    if (template instanceof FOR_Template) {
        refreshMFor(template, templates, templateIndex, { inserted });
        return;
    }
    if (template instanceof Template) {
        const _template = template;
        if (template instanceof Template && template.element !== undefined) {
            refreshElementTemplate(template, { inserted });
        }
        if (template instanceof Template && template.component !== undefined) {
            refreshComponentTemplate(template, { inserted });
        }
        _template.templates.forEach((x, i) => {
            var _a, _b;
            const target = ((_a = x.parentTemplate) === null || _a === void 0 ? void 0 : _a.componentElement) || ((_b = x.parentTemplate) === null || _b === void 0 ? void 0 : _b.element);
            refreshTemplate(target, x, _template.templates, i, {
                inserted,
            });
        });
        return;
    }
};

const currentlyTemplating = [];
const getTemplate = (scope) => {
    if (!(scope instanceof Object))
        return false;
    if (scope._mintTemplate !== undefined &&
        scope._mintTemplate instanceof Template)
        return scope._mintTemplate;
    if (scope._component !== undefined &&
        scope._component !== null &&
        scope._component._mintTemplate instanceof Template)
        return scope._component._mintTemplate;
    return false;
};
const refresh = (scopeOrTemplate) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const focusTarget = document.activeElement;
    if (currentlyTemplating.includes(scopeOrTemplate) ||
        currentlyTemplating.includes(0)) {
        console.warn("MINT WARNING: refresh() detected while still templating, refresh ignored.");
        return;
    }
    currentlyTemplating.push(scopeOrTemplate);
    if (scopeOrTemplate instanceof Template ||
        scopeOrTemplate instanceof IF_Template) {
        const template = scopeOrTemplate;
        if (template.parentTemplate === null)
            return;
        refreshTemplate((((_a = template.scope._mintTemplate) === null || _a === void 0 ? void 0 : _a.componentElement) ||
            ((_b = template.scope._mintTemplate) === null || _b === void 0 ? void 0 : _b.element)), scopeOrTemplate, (_c = template.parentTemplate) === null || _c === void 0 ? void 0 : _c.templates, (_d = template.parentTemplate) === null || _d === void 0 ? void 0 : _d.templates.indexOf(template), { inserted: false });
        return;
    }
    const scope = scopeOrTemplate;
    const template = getTemplate(scope);
    if (template === false)
        return;
    refreshTemplate((template.componentElement || template.element), template, (_f = (_e = template.parentTemplate) === null || _e === void 0 ? void 0 : _e.templates) !== null && _f !== void 0 ? _f : [], ((_g = template.parentTemplate) === null || _g === void 0 ? void 0 : _g.templates.indexOf(template)) || -1, { inserted: false });
    {
        const index = currentlyTemplating.indexOf(scope);
        currentlyTemplating.splice(index, 1);
    }
    if (focusTarget !== null &&
        focusTarget !== document.activeElement &&
        document.body.contains(focusTarget)) {
        focusTarget.focus();
    }
};

const app = (rootElement, rootScope, content) => {
    var _a, _b, _c, _d;
    const existingElements = Array.from(rootElement.children);
    (_a = rootScope.onpretemplate) === null || _a === void 0 ? void 0 : _a.call(rootScope);
    const templates = content instanceof Array
        ? generateTemplates(content, null, rootScope)
        : [generateTemplate(content, null, rootScope)];
    if (templates.includes("_children")) {
        throw new Error(`${MINT_ERROR} Can only pass "_children" as child of Component.`);
    }
    (_b = rootScope.oninit) === null || _b === void 0 ? void 0 : _b.call(rootScope);
    (_c = rootScope.oninsert) === null || _c === void 0 ? void 0 : _c.call(rootScope);
    (_d = rootScope.oneach) === null || _d === void 0 ? void 0 : _d.call(rootScope);
    currentlyTemplating.push(0);
    templates.forEach((x, i) => renderTemplate(rootElement, x, templates, i));
    currentlyTemplating.pop();
    const deleteApp = () => {
        Array.from(rootElement.children).forEach((x) => {
            if (existingElements.includes(x))
                return;
            rootElement.removeChild(x);
        });
    };
    return { deleteApp };
};

const component = (element, scope, attributes = {}, content = []) => {
    if (scope instanceof Store) {
        const _scope = scope;
        class Scope extends Base {
            constructor() {
                super();
                _scope.connect(this);
            }
        }
        scope = Scope;
    }
    return new MintComponent(new MintElement(element, attributes, content), scope);
};

const template = (target, { refreshOnEach, replaceCondition } = {}) => {
    return new MintTemplate(target, { refreshOnEach, replaceCondition });
};

const context = (element, context, content = []) => {
    return new Context(element, context, content);
};

const _element = (name, attributesOrContents, _content) => {
    if (attributesOrContents === undefined) {
        return element(name);
    }
    if (!(attributesOrContents instanceof MintTemplate) &&
        !(attributesOrContents instanceof Context) &&
        !(attributesOrContents instanceof MintElement) &&
        !(attributesOrContents instanceof Array) &&
        typeof attributesOrContents !== "string") {
        return element(name, attributesOrContents, _content);
    }
    else {
        return element(name, null, attributesOrContents);
    }
};
const span = (a, b) => _element("span", a, b);
const div = (a, b) => _element("div", a, b);

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
const getter = (target, property, get) => {
    if (typeof get === "string") {
        const value = get;
        get = function () {
            return _get(this, value);
        };
    }
    Object.defineProperty(target, property, { get });
};

export { Base as MintComponent, MintElement, Resolver, Store, MintComponent as TMintComponent, UpwardRef, app, component, context, div, element, getter, refresh, span, template };
