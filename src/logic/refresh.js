
import { getTemplate } from "./get-template";
import { resolveAttributes } from "./resolve-attributes";
import { resolveBraces } from "./resolve-braces";
import { element as e } from "../elements/element";
import { refreshmForData } from "./refresh-mfor-data";
import { generatemForData } from "./resolve-for";
import { resolveProps } from "./resolve-props";

const reRender = (template, isNewlyInserted = false) => {
    const {
        parentTemplate,
        rootElement,
        attributes,
        templates,
        textValue,
        _mIf,
        _mFor
    } = template;

    let { scope, element } = template;

    if (element instanceof Text) {
        const oldValue = element.nodeValue;
        const newValue = resolveBraces(textValue, scope);
        oldValue !== newValue && (element.nodeValue = newValue);
        return;
    }

    if (_mFor) {

        const newValues = scope[_mFor.forValue];
        const { templates, mintElement } = _mFor;
        const { nodeName, component, attributes, content } = mintElement;
        const { forKey } = _mFor;

        if (forKey === undefined) {
            throw new Error("m-for attributes require a m-key attribute");
        }

        {
            const keyValues = [];
            newValues.forEach(x => {
                if (x[forKey] === undefined) {
                    throw Error(`Object in list does not have key. key: ${forKey}`);
                }
                const current = keyValues.find(y => y === (forKey === "_x" ? x : x[forKey]));
                if (current !== undefined) {
                    throw Error(`Duplicate key match detected. m-for. -- ${_mFor.forValue} -- ${forKey === "_x" ? x : x[forKey]}`);
                }
                keyValues.push(forKey === "_x" ? x : x[forKey]);
            });
        }

        templates.forEach(({ element, scope }) => {
            const isOnNewValue = !!newValues.find(x => forKey === "_x" ? x === scope._x : x[forKey] === scope[forKey]);
            if (!isOnNewValue) {
                element.parentNode.removeChild(element);
            }
        });

        const listOfNewlyAddedTemplatesIndexes = [];
        const holdingElement = document.createElement("DIV");

        const newTemplates = newValues.map(newValue => {
            const template = templates.find(({ scope }) => {
                return forKey === "_x" ? x === scope._x : newValue[forKey] === scope[forKey];
            });
            return {
                template,
                newValue
            }
        })
        .map(({ template, newValue }) => {
            template && refreshmForData(template.scope, newValue);
            return template;
        })
        .map((_x, _i) => {
            if (_x !== undefined) {
                return _x;
            }
            listOfNewlyAddedTemplatesIndexes.push(_i);

            const newScope = generatemForData(_mFor.parentComponentScope, newValues[_i], _i);

            return getTemplate(
                holdingElement,
                parentTemplate,
                e(nodeName || component, attributes, content),
                newScope
            );
        });

        newTemplates.forEach((x, i) => {
            if (document.body.contains(x.element)) {
                return;
            }
            const followingForTemplates = newTemplates.slice(i + 1);
            const nextAvailableTemplate = followingForTemplates.find(y => document.body.contains(y.element));
            if (nextAvailableTemplate) {
                rootElement.insertBefore(x.element, nextAvailableTemplate.element);
            }
            else {
                const currentIndex = parentTemplate.templates.findIndex(({ _mFor: __mFor }) => _mFor === __mFor);
                const followingForTemplates = parentTemplate.templates.slice(currentIndex + 1);
                const nextValidTemplate = followingForTemplates.find(y => document.body.contains(y.element));
                if (followingForTemplates.length === 0 || nextValidTemplate === undefined) {
                    rootElement.appendChild(x.element);
                }
                else {
                    rootElement.insertBefore(x.element, nextValidTemplate.element);
                }
            }
        });

        newTemplates.forEach((template, index) => {
            template.scope._i = index;
            if (listOfNewlyAddedTemplatesIndexes.indexOf(index) === -1) {
                reRender(template);
            }
        });

        _mFor.templates = newTemplates;

        return;
    }

    if (_mIf) {
        let newValue = !!_mIf.scope[_mIf.ifValue];
        _mIf.inverse && (newValue = !newValue)

        // IF: Not in document AND value is false
        if (!_mIf.state && !newValue) {
            return;
        }
        // IF: In document AND value is now false
        if (!newValue) {
            element.parentElement.removeChild(element);
            _mIf.state = newValue;
            return;
        }
        // IF: Not in document AND value is now true
        if (!_mIf.state && newValue) {
            const templateIndex = parentTemplate.templates.findIndex(({ element: _element }) => _element === element);
            const leadingTemplates = parentTemplate.templates.slice(templateIndex + 1);
            const nextElement = leadingTemplates.reduce((a, { element }) => a !== null ? a : document.body.contains(element) ? element : a, null);

            if (!_mIf.templated) {
                _mIf.templated = true;
                const holdingElement = document.createElement("div");
                const _newTemplate = getTemplate(
                    holdingElement,
                    parentTemplate,
                    _mIf.mintElement,
                    scope
                );
                element = holdingElement.children[0];
                scope = _newTemplate.scope;
                template.element = element;
                template.templates = _newTemplate.templates;
            }

            if (nextElement !== null) {
                _mIf.rootElement.insertBefore(element, nextElement);
            }
            else {
                _mIf.rootElement.appendChild(element);
            }
            _mIf.state = newValue;
            isNewlyInserted = true;
            
        }
    }

    // template.isComponent && console.log("Copo: ", template);
    template.isComponent && !!template.props && resolveProps(template.props, template.scope, template.parentTemplate.scope);

    attributes && resolveAttributes(element, scope, attributes);
    

    isNewlyInserted && scope?.oninsert?.();
    template.isComponent && scope?.oneach?.();

    templates?.forEach(x => (reRender(x, isNewlyInserted)));
}

export const refresh = (scope) => {
    reRender(scope._mintTemplate);
}
