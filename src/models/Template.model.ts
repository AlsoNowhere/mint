import { MintComponent } from "./MintComponent.model";
import { IF_Template } from "./IF_Template.model";
import { MintElement } from "./MintElement.model";
import { Context } from "./Context.model";

import { I_mRef } from "../interfaces/I_mRef.interface";
import { IComponent } from "../interfaces/mintElement/IComponent.interface";
import { I_mTemplate } from "../interfaces/I_mTemplate.interface";
import { IScope } from "../interfaces/IScope.interface";
import { I_mIf } from "../interfaces/I_mIf.interface";
import { I_mFor } from "../interfaces/I_mFor.interface";

interface ICommonArguments {
  templates?: Array<Template | IF_Template>;
  scope: IScope;
  parentTemplate: null | Template;
  mintElement: MintElement | string;
}

type TArguments = ICommonArguments &
  (
    | {
        // TextNode
        element: Text;
        textValue: string;
        attributes?: never;
        component?: never;
        content?: never;
        props?: never;
        mIf?: never;
        mFor?: never;
        mRef?: never;
        mTemplate?: never;
        componentElement?: never;
        mintElement: string;
        context?: never;
      }
    | {
        // HTMLElement
        element: SVGElement | HTMLElement | MintComponent;
        textValue?: never;
        attributes: Object;
        component?: never;
        content?: never;
        props?: never;
        mIf?: I_mIf;
        mFor?: I_mFor;
        mRef?: I_mRef;
        mTemplate?: I_mTemplate;
        componentElement?: never;
        mintElement: MintElement;
        context?: Context;
      }
    | {
        // Component
        element?: never;
        textValue?: never;
        component: MintComponent;
        content: null | Array<Template>;
        props: Object;
        mIf?: I_mIf;
        mFor?: I_mFor;
        mRef?: I_mRef;
        mTemplate?: I_mTemplate;
        componentElement: SVGElement | HTMLElement;
        attributes: Object;
        mintElement: IComponent;
        context?: Context;
      }
  );

export class Template implements ICommonArguments {
  textNode?: Text;
  textValue?: string;
  element?: SVGElement | HTMLElement;
  attributes: Object;
  props: Object;
  component?: MintComponent;
  content: null | Array<Template>;
  isComponent: boolean;
  templates: Array<Template | IF_Template>;
  scope: IScope;
  parentTemplate: null | Template;
  mIf?: I_mIf;
  mFor?: I_mFor;
  mRef?: I_mRef;
  mTemplate?: I_mTemplate;
  componentElement?: SVGElement | HTMLElement;
  mintElement: MintElement | string;
  context?: Context;

  constructor({
    element,
    textValue,
    attributes,
    component,
    content,
    props,
    templates = [],
    scope,
    parentTemplate,
    mIf,
    mFor,
    mRef,
    mTemplate,
    componentElement,
    mintElement,
    context,
  }: TArguments) {
    if (element instanceof Text) {
      this.textNode = element;
      this.textValue = textValue;
      this.isComponent = false;
    } else if (
      element instanceof HTMLElement ||
      element instanceof SVGElement
    ) {
      this.element = element;
      this.attributes = attributes as Object;
      this.isComponent = false;
      this.mIf = mIf;
      this.mFor = mFor;
      this.mRef = mRef;
      this.mTemplate = mTemplate;
      this.context = context;
    } else if (component instanceof MintComponent) {
      this.component = component;
      this.content = content as null | Array<Template>;
      this.props = props as Object;
      this.isComponent = true;
      this.mIf = mIf;
      this.mFor = mFor;
      this.mRef = mRef;
      this.mTemplate = mTemplate;
      this.componentElement = componentElement;
      this.attributes = attributes as Object;
      this.context = context;
    }
    this.templates = templates;
    this.scope = scope;
    this.parentTemplate = parentTemplate;
    this.mintElement = mintElement;
  }
}
