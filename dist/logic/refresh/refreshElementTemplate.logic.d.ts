import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
export declare const refreshElementTemplate: (template: Template | IF_Template, { inserted }: {
    inserted: boolean;
}) => void;
