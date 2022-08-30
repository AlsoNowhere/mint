
import { getTemplate } from "./logic/get-template";

export const app = (
    rootElement,
    rootScope,
    appContent
) => {
    const template = getTemplate(rootElement, undefined, appContent, rootScope);

    rootScope._mintTemplate = template;

    return template;
}
