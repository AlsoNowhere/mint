
// Logic
import { resolveAttributes } from "./resolve-attributes";
import { resolveBraces } from "./resolve-braces";
import { resolveFor } from "./resolve-for";
import { resolveIf } from "./resolve-if";
import { resolveProps } from "./resolve-props";

// Models
import { Template } from "../models/Template";
import { register } from "../data/register";
import { element } from "../elements/element";

export const getTemplate = (
    rootElement,
    parentTemplate,
    mintElementOrString,
    parentComponentScope,
    DOMElement = null
) => {
    if (mintElementOrString instanceof Array) {
        return mintElementOrString.map(x => getTemplate(rootElement, parentTemplate, x, parentComponentScope))
    }

    if (typeof mintElementOrString === "string") {
        const string = mintElementOrString;
        const newValue = resolveBraces(string, parentComponentScope);
        const DOMElement = document.createTextNode(newValue);
        rootElement.appendChild(DOMElement);
        const template = new Template(DOMElement, string, parentComponentScope);
        return template;
    }

    const mintElement = mintElementOrString;

/* *** === *** mintElement test */
    // console.log("mintElement test: ", mintElement);

    const { nodeName, props, content: definedContent } = mintElement;
    let { component } = mintElement;
    component instanceof Function && (component = component());
    const isComponent = !!component;
    const attributes = isComponent ? {...component.attributes} ?? {} : {...mintElement.attributes} ?? {};

    if (props) {
        if (!!props["m-ref"]) {
            attributes["m-ref"] = props["m-ref"];
            delete props["m-ref"];
        }
        if (!!props["m-if"]) {
            attributes["m-if"] = props["m-if"];
            delete props["m-if"];
        }
        if (!!props["m-for"]) {
            attributes["m-for"] = props["m-for"];
            delete props["m-for"];
        }
    }

    let newComponentScope;
    let content = isComponent ? component.content : definedContent;
    content && !(content instanceof Array) && (content = [content]);
    let mIf;

    if (attributes["m-for"]) {
        const forValue = attributes["m-for"];
        if (!attributes["m-key"]) {
            throw new Error("m-for must have a m-key attribute");
        }
        const forKey = attributes["m-key"];
        delete attributes["m-for"];
        delete attributes["m-key"];
        const { elements, scopes } = resolveFor({ nodeName, attributes }, parentComponentScope, forValue, content);
        const templates = elements.map((element, index) => getTemplate(rootElement, parentTemplate, element, scopes[index]));

        // console.log("Templates: ", templates);

        const template = new Template(null, attributes, parentComponentScope);
        template.parentTemplate = parentTemplate;
        template.rootElement = rootElement;
        template._mFor = {
            forValue,
            forKey,
            templates,
            mintElement: element(nodeName || component, attributes, definedContent),
            parentComponentScope,
            content
        };
        return template;
    }

    let templates;

/* *** === *** Scopes test */
    // console.log("Scopes: ", parentComponentScope);

/* *** === *** Component test */
    // console.log("Component: ", component);

/* *** === *** Attributes test */
    // console.log("Attributes: ", attributes);

/* *** === *** Props test */
    // console.log("Props: ", props);

    if (attributes["m-if"]) {
        const ifValue = attributes["m-if"];
        delete attributes["m-if"];
        mIf = resolveIf(
            parentComponentScope,
            rootElement,
            ifValue,
            mintElement
        );
    }

/* *** === *** mIf test */
    // console.log("mIf: ", mIf);

    if (mIf ? mIf.state : true) {
        // Component
        if (isComponent) {
            newComponentScope = new component.componentScope();
            props instanceof Object && resolveProps(props, newComponentScope, parentComponentScope);
            DOMElement = document.createElement(component.nodeName);
            rootElement.appendChild(DOMElement);
        }
        // Element
        else {
            DOMElement = document.createElement(nodeName);
            rootElement.appendChild(DOMElement);
        }

        if (attributes["m-ref"]) {
            const refValue = attributes["m-ref"];
            delete attributes["m-ref"];
            newComponentScope[refValue] = DOMElement;
        }

        attributes instanceof Object
            && resolveAttributes(DOMElement, newComponentScope || parentComponentScope, attributes, parentComponentScope);

        newComponentScope?.oninit?.();
    }

/* *** === *** Attributes test */
    // console.log("Attributes: ", attributes);

/* *** === *** Element test */
    // console.log("Element: ", DOMElement);

    const template = new Template(DOMElement, attributes, newComponentScope || parentComponentScope);

/* *** === *** Template test */
    // console.log("Template test: ", template);

/* *** === *** Content test */
    // console.log("Content test: ", content);

    if ((!mIf || mIf.state) && !!content) {
        templates = getTemplate(DOMElement, template, content, newComponentScope || parentComponentScope);
    }

    template.templates = templates;
    template.parentTemplate = parentTemplate;
    template.rootElement = rootElement;
    template.isComponent = isComponent;
    props && (template.props = props);

    mIf && (template._mIf = mIf);

    if (!mIf || mIf.state) {
        if (isComponent) {
            newComponentScope._mintTemplate = template;
        }
        else {
            register.set(DOMElement, template);
        }
    }

    return template;
}
