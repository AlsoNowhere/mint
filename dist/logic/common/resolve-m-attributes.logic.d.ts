import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TShouldExit } from "../../types/TShouldExit.type";
export declare const resolveMAttributes: (resolveMode: "onGenerate" | "onRender" | "onRefresh", { orderedProps, props, htmlElement, mintContent, parentBlueprint, scope, rootScope, isSVG, isComponent, }: {
    orderedProps: Array<string>;
    props: IProps;
    htmlElement: TElement | undefined;
    mintContent: INode;
    parentBlueprint: TParentBlueprint | null;
    scope: IScope;
    rootScope: IRootScope;
    isSVG: boolean;
    isComponent: boolean;
}) => TShouldExit;
